import './Layout.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { useSelector } from "react-redux";

function LayoutApp() {
  const authen = useSelector((state) => state.authenReducer);
  return (
    <>
      <div className='layout'>
        <Header />
        <main className='main'>
          <div className='container'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default LayoutApp;