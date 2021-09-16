import { withStyles, Tabs, Tab } from '@material-ui/core'

const MyTab = withStyles({
  root: {
    minHeight: '0',
    padding: '0 15px',
    marginRight: '0',
    boxSizing: 'content-box',
    fontFamily: 'Frutiger',
    backgroundColor: '#252525',
    '&>span': {
      color: '#fff',
      alignItems: 'start',
    },
  },
  textColorInherit: {
    opacity: '1',
  },
  selected: {
    backgroundColor: '#4E516A',
    '&>span': {
      color: '#fff',
    },
  },
})((props) => <Tab {...props} />)
const MyTabs = withStyles({
  root: {
    minHeight: '0',
  },
  flexContainer: {
    height: '35px',
  },
  indicator: {
    display: 'none',
  },
})((props) => {
  return (
    <div style={{ position: 'relative' }}>
      <Tabs {...props} variant="fullWidth">
        {props.labels.map((v, k) => (
          <MyTab key={k} label={v} />
        ))}
      </Tabs>
    </div>
  )
})

export default MyTabs
