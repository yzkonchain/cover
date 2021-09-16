import { useContext, useMemo } from 'react'
import { makeStyles, Icon, FormControl, Select, MenuItem } from '@material-ui/core'
import { liteContext, bondList, wantList, poolSelect } from '@/config'

const useStyles = makeStyles({
  root: {},
  formControlTitle: {
    fontFamily: 'Helvetica',
    fontSize: '14px',
    display: 'block',
    margin: '15px 0 5px',
    color: '#30384B',
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
    minWidth: '44px',
    maxWidth: '44px',
    background: 'none !important',
  },
  select: {
    '&>div': {
      '& span,& img': {
        verticalAlign: 'middle',
      },
    },
  },
})

export default function PoolSelector() {
  const classes = useStyles()
  const {
    liteState: { bond, want },
    setLiteState,
  } = useContext(liteContext)

  return useMemo(
    () => (
      <div className={classes.root}>
        <div className={classes.formControlList}>
          <MenuItem value={bond.addr} className={classes.menu}>
            <img alt="" src={bond.icon} className={classes.icon} />
            <span>{bond.symbol}</span>
          </MenuItem>
          <div className={classes.icon_arrow} />
          <MenuItem value={want.addr} className={classes.menu}>
            <img alt="" src={want.icon} className={classes.icon} />
            <span>{want.symbol}</span>
          </MenuItem>
        </div>
      </div>
    ),
    [bond, want],
  )
}
