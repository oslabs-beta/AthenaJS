import React from 'react'

const NavBar = ({handleToggleWindow}) => {
  return (
    <nav className='navbar'>
      <ul>
        <li className="nav-link"><a href='#' onClick = {handleToggleWindow.props}>Props</a></li>
        <li className="nav-link"><a href='#' onClick={handleToggleWindow.performance}>Performance</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;