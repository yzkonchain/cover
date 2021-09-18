import { ethers } from 'ethers'
import { useContext, useReducer, useMemo, useEffect, useState } from 'react'
import { context, liteContext } from '@/config'
import { MyButton, Amount, AmountShow, ApyFloatMessage } from '@/components/Modules'
import { MenuItem } from '@material-ui/core'

const ZERO = ethers.constants.Zero
const INIT = {
  bond: ZERO,
  want: ZERO,
  I: { bond: '', want: '' },
  old: { bond: '', want: '' },
}
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)

export default function Borrow() {
  const {
    state: { controller },
  } = useContext(context)
  const {
    liteState: { pool, bond, want, coll, data },
    classesChild: classes,
    handleClick,
  } = useContext(liteContext)
  const [state, setState] = useReducer((o, n) => ({ ...o, ...n }), INIT)
  const [mode, setMode] = useState(true)
  const [verify, setVerify] = useState('')

  useEffect(() => state == INIT || setState(INIT), [pool])
  useEffect(() => {
    const bond = parse(state.I.bond)
    const want = parse(state.I.want)
    if (!bond.eq(state.bond)) {
      pool.ct
        .get_dy(bond)
        .then((want) => {
          setVerify('')
          setState({ bond, want, I: { ...state.I, want: format(want) } })
          if (bond.gt(data.balance.bond)) setVerify('Insufficient Balance')
        })
        .catch(() => {
          setVerify('Insufficient Liquidity')
          setState({ bond: ZERO, want: ZERO })
        })
    } else if (!want.eq(state.want)) {
      setState({ bond: want, want, I: { ...state.I, bond: format(want) } })
      if (want.gt(data.balance.want)) setVerify('Insufficient Balance')
    }
  }, [state.I])

  return useMemo(
    () => (
      <div className={classes.root}>
        <div className={classes.amount}>
          <div>
            {mode ? (
              <Amount
                title="bond"
                State={{
                  state,
                  setState,
                  token: bond,
                  max: data.balance.bond,
                  if_max: data.balance.bond.gt('0'),
                }}
                style={{ height: '50px' }}
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
                style={{ height: '50px' }}
              />
            )}
          </div>
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
              title="want"
              State={{
                state,
                setState,
                token: want,
                max: data.balance.want,
                if_max: data.balance.want.gt('0'),
              }}
              style={{ height: '50px' }}
            />
          ) : (
            <Amount
              title="bond"
              State={{
                state,
                setState,
                token: bond,
                max: data.balance.bond,
                if_max: data.balance.bond.gt('0'),
              }}
              style={{ height: '50px' }}
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
          {mode ? (
            <div>
              {data.allowance.bond.gt('100000000000000000000000000000000') || !pool.ct.signer ? (
                <MyButton
                  name="Borrow"
                  onClick={() =>
                    handleClick('borrow')(state.bond, state.want).then(() => setState({ I: { bond: '', want: '' } }))
                  }
                  disabled={ZERO.eq(state.want) || data.allowance.bond.lt('100000000000000000000000000000000')}
                />
              ) : (
                <MyButton name="Approve" onClick={() => handleClick('approve')(bond)} />
              )}
            </div>
          ) : (
            <div>
              {data.allowance.want.gt('100000000000000000000000000000000') || !pool.ct.signer ? (
                <MyButton
                  name="Repay"
                  onClick={() => handleClick('repay')(state.want).then(() => setState({ I: { bond: '', want: '' } }))}
                  disabled={ZERO.eq(state.bond) || data.allowance.want.lt('100000000000000000000000000000000')}
                />
              ) : (
                <MyButton name="Approve" onClick={() => handleClick('approve')(want)} />
              )}
            </div>
          )}
          {/* <MyButton name="Mint" onClick={() => handleClick('mint')(state.bond)} />
          <MyButton name="Deposit" onClick={() => handleClick('deposit')(state.want, data.balance.coll)} /> */}
        </div>
      </div>
    ),
    [state, data, mode, verify],
  )
}
