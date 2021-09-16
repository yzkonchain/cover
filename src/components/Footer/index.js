import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { makeStyles, Icon } from '@material-ui/core'
import Twitter from '@/assets/png/link/twitter.png'
import Discord from '@/assets/png/link/discord.png'
import Medium from '@/assets/png/link/medium.png'
import Tg from '@/assets/png/link/tg.png'
import Github from '@/assets/png/link/github.png'

const useStyles = makeStyles(() => ({
  root: {
    zIndex: '1',
    backgroundColor: '#1B225C',
    height: '56px',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '16px',
    color: '#fffdec',
    fontFamily: 'Frutiger',
  },
  about: {
    '& span,& a': {
      textDecoration: 'none',
      margin: '0 10px',
      color: '#fffdec',
    },
    '& a:visited': {
      color: '#fffdec',
    },
  },
  follow: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      margin: '0 10px',
      '& img': {
        width: '20px',
      },
    },
  },
}))

export default function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.about}>
        <span>About Us</span>
        <a href="https://github.com/CollarFinance/audits">Audits</a>
        <a href="https://github.com/CollarFinance/deck">Deck</a>
        <a href="mailto:contact@collar.org">Contact</a>
      </div>
      <div className={classes.follow}>
        <a href="https://twitter.com/CollarFinance">
          <img src={Twitter} />
        </a>
        <a href="https://discord.com/invite/GetGygfMBy">
          <img src={Discord} />
        </a>
        <a href="https://collarfinance.medium.com">
          <img src={Medium} />
        </a>
        <a href="https://t.me/collarfinance">
          <img src={Tg} />
        </a>
        <a href="https://github.com/CollarFinance">
          <img src={Github} />
        </a>
      </div>
    </div>
  )
}
