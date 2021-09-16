import { makeStyles } from '@material-ui/core'
import Border from '@/assets/png/button/border.png'
import Grey from '@/assets/png/button/grey.png'
import Red from '@/assets/png/button/red.png'

const useStyles = makeStyles((theme) => ({
  button: {
    fontFamily: 'Frutiger',
    padding: '0',
    background: 'none',
    border: 'none',
    position: 'relative',
    '&:hover': {
      opacity: ({ disabled }) => (disabled ? 1 : 0.8),
    },
    '&:active': {
      transform: ({ disabled }) => (disabled ? 'none' : 'translateY(3px)'),
    },
    '&>div:first-child': {
      color: '#fff',
      left: '0',
      width: '100%',
      height: '100%',
      fontWeight: 'bold',
      position: 'absolute',
      display: 'flex',
      '& span': {
        fontSize: '18px',
        margin: 'auto',
      },
      transform: 'translateY(-2px)',
    },
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      height: '50px',
    },
  },
}))

export default function Button({ name, onClick, style, disabled }) {
  const classes = useStyles({ disabled })
  return (
    <button className={classes.button} {...{ onClick, style, disabled }}>
      <div>
        <span>{name}</span>
      </div>
      <div className={classes.img}>
        <img alt="" src={Border} />
        <img style={{ flexGrow: 1 }} alt="" src={disabled ? Grey : Red} />
        <img alt="" src={Border} />
      </div>
    </button>
  )
}
