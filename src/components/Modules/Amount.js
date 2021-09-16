import { ethers } from 'ethers'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { TextField, makeStyles } from '@material-ui/core'
import { FloatMessage } from '@/components/Modules'
import { textInfo, tokenList } from '@/config'
import { Price } from '@/hooks'
import { useSnackbar } from 'notistack'
import { balanceMax, balanceMaxDisabled } from '@/assets/svg'

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Frutiger',
    backgroundColor: '#36394C',
    marginTop: '20px',
  },
  AmountInput: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    '& input': {
      padding: '0',
      margin: '0 5px 0 0',
      fontSize: ({ fontSize }) => `${fontSize}px`,
      fontWeight: 'bold',
      border: 'none',
      width: '100%',
      color: '#FFFDEC',
      height: '35px',
    },
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&>div': {
      width: '100%',
      '&>div': {
        '&:before,&:after,&:hover:not(.Mui-disabled):before': {
          border: 'none',
        },
      },
    },
  },
  token: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#FFFDEC',
    marginLeft: '2px',
  },
}))
const format = (num, n) => ethers.utils.formatUnits(num, n || 18)
const parse = (num, n) => ethers.utils.parseUnits(num || '0', n || 18)

export default function Amount({ State, title, style }) {
  const { enqueueSnackbar } = useSnackbar()
  const [fontSize, setFontSize] = useState(35)
  const [anchorEl, setAnchorEl] = useState(null)
  const { state, setState, token, max, if_max } = State
  const classes = useStyles({ fontSize })
  const inputRef = useRef()

  const changInput = useCallback(
    ({ target: { value }, nativeEvent: { data } }) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', null].indexOf(data) > -1) {
        const old = state.I[title]
        if (
          (data === '.' && (value.length === 1 || old.indexOf('.') !== -1)) ||
          (old === '0' && ['.', null].indexOf(data) === -1) ||
          (value.indexOf('.') == -1 ? 0 : value.length - value.indexOf('.') - 1) > token.decimals
        )
          return
        setState({ I: { ...state.I, [title]: value }, old: { ...state.old, [title]: old } })
      }
    },
    [state.I, max],
  )

  useEffect(() => {
    const [_new, _old] = [state.I[title], state.old[title]]
    const { offsetWidth: o, scrollWidth: s } = inputRef.current
    if (_new.length > (_old || '').length && o < s - 1 && fontSize >= 8) setFontSize(fontSize * 0.91)
    else if (_new.length < (_old || '').length && o >= s && fontSize < 35) setFontSize(fontSize * 1.1)
  }, [fontSize, state.I[title]])

  return useMemo(
    () => (
      <div className={classes.root}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
          <div style={{ height: '25px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Frutiger', fontSize: '14px', color: '#FFFDEC', marginLeft: '10px' }}>
              {title.toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: 'Material Icons Outlined',
                fontSize: '16px',
                marginLeft: '5px',
                color: '#B2B2B2',
              }}
              onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
              onMouseLeave={() => setAnchorEl(null)}
            >
              info
            </span>
            <FloatMessage anchorEl={anchorEl} info={textInfo[title]} />
          </div>
          <span style={{ color: '#FFFDEC', marginRight: '10px' }}>Balance: {parseFloat(format(max)).toFixed(2)}</span>
        </div>
        <div className={classes.AmountInput} style={style}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img alt="" src={token.icon} style={{ width: '32px', marginRight: '10px' }} />
            <span style={{ color: '#FFFDEC', marginRight: '20px', fontSize: '20px' }}>{token.symbol}</span>
          </div>
          <div className={classes.amount}>
            <TextField
              value={state.I[title]}
              onChange={changInput}
              inputRef={inputRef}
              placeholder="0.00"
              InputProps={{
                endAdornment: (
                  <img
                    alt=""
                    src={if_max ? balanceMax : balanceMaxDisabled}
                    onClick={
                      if_max
                        ? () => {
                            setState({
                              I: {
                                ...state.I,
                                [title]: `${format(max, token.decimals)}`,
                              },
                            })
                          }
                        : () => {}
                    }
                    style={{ width: '60px' }}
                  />
                ),
              }}
            ></TextField>
          </div>
        </div>
      </div>
    ),
    [State, anchorEl],
  )
}
