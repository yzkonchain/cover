import { ethers } from 'ethers'
import { useContext, useReducer, useMemo, useEffect, useState } from 'react'
import { context, liteContext } from '@/config'
import { MyButton, Amount, AmountShow, ApyFloatMessage } from '@/components/Modules'
import { MenuItem } from '@material-ui/core'

const ZERO = ethers.constants.Zero
const INIT = {
  coll: ZERO,
  want: ZERO,
  I: { coll: '', want: '' },
  old: { coll: '', want: '' },
}
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)
const with_loss = (x) => x.mul(995).div(1000)

export default function Lend() {
  const {
    state: { signer, controller },
  } = useContext(context)
  const {
    liteState: { bond, want, coll, pool, data },
    classesChild: classes,
    handleClick,
  } = useContext(liteContext)
  const [state, setState] = useReducer((o, n) => ({ ...o, ...n }), INIT)
  const [mode, setMode] = useState(true)
  const [verify, setVerify] = useState('')

  useEffect(() => state == INIT || setState(INIT), [pool])
  useEffect(() => {
    const coll = parse(state.I.coll)
    const want = parse(state.I.want)
    if (!want.eq(state.want)) {
      pool.ct
        .get_dx(want)
        .then((coll) => {
          setVerify('')
          setState({ coll, want, I: { ...state.I, coll: format(coll) } })
        })
        .catch(() => {
          setVerify('Insufficient Liquidity')
          setState({ coll: ZERO, want: ZERO })
        })
    } else if (!coll.eq(state.coll)) {
      pool.ct
        .get_dy(coll)
        .then((want) => {
          setVerify('')
          setState({ coll, want, I: { ...state.I, want: format(want) } })
        })
        .catch(() => {
          setVerify('Insufficient Liquidity')
          setState({ coll: ZERO, want: ZERO })
        })
    }
  }, [state.I])

  return useMemo(
    () => (
      <div className={classes.root}>
        <div className={classes.amount}>
          {mode ? (
            <Amount
              title="want"
              State={{
                state,
                setState,
                token: want,
                max: data.balance.want,
                if_max: data.balance.want.gt('0'),
              }}
              style={{ height: '50PX' }}
            />
          ) : (
            <Amount
              title="coll"
              State={{
                state,
                setState,
                token: coll,
                max: data.balance.coll,
                if_max: data.balance.coll.gt('0'),
              }}
              style={{ height: '50PX' }}
            />
          )}
          <span
            className={classes.icon_arrow}
            onClick={() => {
              setMode(!mode)
              setState(INIT)
            }}
          >
            swap_horiz
          </span>
          {mode ? (
            <Amount
              title="coll"
              State={{
                state,
                setState,
                token: coll,
                max: data.balance.coll,
                if_max: data.balance.coll.gt('0'),
              }}
              style={{ height: '50PX' }}
            />
          ) : (
            <Amount
              title="want"
              State={{
                state,
                setState,
                token: want,
                max: data.balance.want,
                if_max: data.balance.want.gt('0'),
              }}
              style={{ height: '50PX' }}
            />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Helvetica', fontSize: '14px', color: 'red' }}>{verify}</div>
          <ApyFloatMessage
            apy={parseFloat(data.apy).toPrecision(3)}
            info={`APY is the fixed-rate lending interest received by 
          lender. This is the total cost for the 2-year-duration
          loan. When lender exits before the expiry date, the
          interest earned for the remainder of the loan at that
          moment will be deducted in COLLAR.
          `}
          />
        </div>
        <div className={classes.button}>
          <div>
            {data.allowance.want.gt('100000000000000000000000000000000') || !pool.ct.signer ? (
              mode ? (
                <MyButton
                  name="Lend"
                  onClick={() => handleClick('lend')(state.want).then(() => setState({ I: { coll: '', want: '' } }))}
                  disabled={ZERO.eq(state.coll)}
                />
              ) : (
                <MyButton
                  name="Exit"
                  onClick={() => handleClick('redeem')(state.coll).then(() => setState({ I: { coll: '', want: '' } }))}
                  disabled={ZERO.eq(state.want)}
                />
              )
            ) : (
              <MyButton name="Approve" onClick={() => handleClick('approve')(want)} />
            )}
          </div>
        </div>
      </div>
    ),
    [state, data, mode, verify],
  )
}
