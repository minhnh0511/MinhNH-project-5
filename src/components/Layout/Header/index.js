import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { getCookie } from '../../../helpers/cookie';
import logo from '../../../images/quiz-logo.png';

function Header() {
  const token = getCookie("token");


  return (
    <>
      <header className='header'>
        <div className='container'>
          <div className='header__wrap'>
            <div className='header__logo'>
              <Link to='/'>
                <img src={logo} alt='logo' />
              </Link>
            </div>
            {token ? (
              <div className='header__menu'>
                <ul>
                  <li className='display-none'>
                    <NavLink to='/'>Home</NavLink>
                  </li>
                  <li className='display-none'>
                    <NavLink to='/topics' >Topics</NavLink>
                  </li>
                  <li>
                    <NavLink to='/answers'>Answers</NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className='header__menu'>
                  <ul>
                    <li className='display-none'>
                      <NavLink to='/'>Home</NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
                <div className='header__account'>
                  <ul>
                    {token ? (
                      <>
                        <li>
                          <Link to='/logout'>Logout</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li>
                          <NavLink to='register'>Register</NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
          </div>
      </header>
    </>
  );
}

export default Header;