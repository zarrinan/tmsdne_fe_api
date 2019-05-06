import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  render() {
    return (
      <div className='nav'>
        <div className='navContainer'>
          <ul className='nav-list'>
            <li><Link className='link' to='/'></Link></li>
          </ul>
        </div>
      </div>
    )
  }
}


