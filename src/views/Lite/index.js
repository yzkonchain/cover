import { ethers } from 'ethers'
import { useContext, useReducer, useEffect, useMemo, useState, useCallback, Suspense, lazy } from 'react'
import { makeStyles, withStyles } from '@material-ui/core'
import { context, liteContext, pools, poolSelect, STYLE, textInfo } from '@/config'
import { MyTabs, Loading } from '@/components/Modules'
import PoolSelector from './PoolSelector'

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 156px)',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '100px',
    alignItems: 'center',
    '&>div': {
      position: 'relative',
      backgroundColor: '#4E516A',
      '&:nth-child(1)': {
        textAlign: 'center',
        fontSize: '25px',
        color: 'white',
        fontFamily: 'Gillsans',
        background: 'none',
        lineHeight: '40px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '&:nth-child(2)': {
        zIndex: '4',
        margin: '20px 20px 0 20px',
      },
      '&:nth-child(3)': {
        zIndex: '2',
        transform: 'translateY(-13px)',
        boxSizing: 'border-box',
        border: '#4C4C4C 2px solid',
        height: '20px',
        width: 'calc(100% - 60px)',
      },
      '&:nth-child(4)': {
        zIndex: '1',
        transform: 'translateY(-26px)',
        boxSizing: 'border-box',
        border: '#4C4C4C 2px solid',
        height: '20px',
        width: 'calc(100% - 80px)',
      },
      [STYLE.MOBILE]: {
        width: 'calc(100% - 40px)',
      },
      [STYLE.PC]: {
        width: '900px',
        '&:nth-child(3)': {
          width: '880px',
        },
        '&:nth-child(4)': {
          width: '860px',
        },
      },
    },
  },
  content: {
    zIndex: '3',
    position: 'relative',
    backgroundColor: '#4E516A',
    border: '#4C4C4C 2px solid',
    borderTop: 'none',
    padding: '15px',
  },
})
const useStylesChild = makeStyles({
  root: {},
  amount: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>div': {
      width: '50%',
    },
  },
  formControlList: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>div': {
      backgroundColor: '#36394C',
      '&>div': {
        lineHeight: 'unset',
      },
      '&>div::before': {
        border: 'none',
      },
    },
  },
  menu: {
    backgroundColor: '#36394C',
    width: '50%',
    padding: '8px 0',
    '& span': {
      fontFamily: 'Frutiger',
      fontSize: '18px',
      color: '#FFFDEC',
    },
  },
  icon: {
    width: '26px',
    margin: '0 10px',
  },
  icon_arrow: {
    fontFamily: 'Material Icons',
    marginTop: '20px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px',
    cursor: 'pointer',
    color: '#FFFDEC',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    '&>div': {
      display: 'flex',
      justifyContent: 'center',
      '&>button': {
        width: '50%',
      },
    },
  },
})

const ZERO = ethers.constants.Zero
const data_zero = {
  balance: {
    bond: ZERO,
    want: ZERO,
    call: ZERO,
    coll: ZERO,
    clpt: ZERO,
    collar: ZERO,
  },
  allowance: {
    bond: ZERO,
    want: ZERO,
  },
  earned: {
    collar: ZERO,
  },
  swap: {
    sx: ZERO,
    sy: ZERO,
    sk: ZERO,
  },
  apy: 0,
}

const timer = (time) => {
  return new Date(time).toLocaleString()
}

const Timer = withStyles({
  root: {
    fontFamily: 'Frutiger',
    margin: '15px 0',
    display: 'flex',
    fontSize: '18px',
    color: '#FFF6F2',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})(({ classes, timer }) => (
  <div className={classes.root}>
    <span>Expiry : {timer}</span>
  </div>
))

export default function Lite() {
  const classes = useStyles()
  const classesChild = useStylesChild()
  const {
    state: { signer, controller },
  } = useContext(context)
  const [loading, setLoading] = useState(false)
  const [liteState, setLiteState] = useReducer((o, n) => (typeof n === 'function' ? n(o) : { ...o, ...n }), {
    tabs: 0,
    tabsChild: 0,
    round: [0, !pools[0].r2],
    pool: pools[0].r1,
    coll: pools[0].r1.coll,
    bond: pools[0].r1.bond,
    want: pools[0].r1.want,
    data: data_zero,
  })
  const { tabs, tabsChild, pool, data, round } = liteState
  const tabsList = ['Borrow', 'Lend']

  const Content = useCallback(
    lazy(() => import(`./${tabsList[tabs]}`)),
    [tabs],
  )

  const handleClick = useCallback(
    (type) =>
      async function () {
        return await controller[type]
          .call(null, ...arguments, pool)
          .then((res) => {
            if (res) return controller.fetch_state(pool)
            else throw new Error()
          })
          .then((data) => setLiteState({ data }))
          .catch(() => false)
      },
    [pool.addr],
  )

  useEffect(() => {
    const poolName = `${pool.bond.addr}-${pool.want.addr}`
    setLiteState({ pool: poolSelect[`${poolName}-${round[0]}`] })
  }, [round[0]])

  useEffect(() => {
    const poolName = `${pool.bond.addr}-${pool.want.addr}`
    const poolRound = !poolSelect[`${poolName}-1`]
    const newRound = [poolRound ? 0 : round[0], poolRound]
    ;(async () => {
      setLoading(true)
      const newData = await controller.fetch_state(pool)
      setLiteState((o) =>
        !signer && data === data_zero && o.data !== data_zero ? o : { ...o, data: newData, round: newRound },
      )
      setLoading(false)
    })()
  }, [signer, pool.addr])

  return useMemo(
    () => (
      <liteContext.Provider value={{ liteState, setLiteState, handleClick, classesChild }}>
        <div className={classes.root}>
          <div>
            {tabsList[tabs] === 'Borrow' ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Use COVER to borrow mockCOLLAR:</span>
                <span>Fixed rate, free repay, and 100% LTV</span>
              </div>
            ) : (
              <div>Lend COLLAR with fixed return</div>
            )}
          </div>
          <div>
            <MyTabs value={tabs} onChange={(_, v) => setLiteState({ tabs: v, tabsChild: 0 })} labels={tabsList} />
            <div className={classes.content}>
              <div
                className={classes.tip}
                style={{
                  backgroundColor: '#DDC5C0',
                  color: '#191919',
                  padding: '10px',
                  fontFamily: 'Gillsans',
                  marginTop: '5px',
                }}
              >
                <ul
                  style={{
                    lineHeight: '25px',
                    paddingInlineStart: '20px',
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                  }}
                >
                  <li>{textInfo[tabsList[tabs]]}</li>
                  <li>{textInfo['fee']}</li>
                </ul>
              </div>
              {/* <Timer timer={timer(pool.expiry_time * 1000)} /> */}
              {/* <PoolSelector /> */}
              <Suspense fallback={<div style={{ height: '222px' }} />}>
                <Content />
              </Suspense>
            </div>
          </div>
          <Loading open={loading} />
        </div>
      </liteContext.Provider>
    ),
    [liteState, loading],
  )
}
