import { Navigate } from 'react-router-dom';
import LayoutApp from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Register from '../pages/Register';
import PrivateRoutes from '../components/PrivateRoutes';
import Topics from '../pages/Topics';
import Answers from '../pages/Answers';
import Result from '../pages/Result';
import Quiz from '../pages/Quiz';

export const routes = [
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/topics',
            element: <Topics />,
          },
          {
            path: '/answers',
            element: <Answers />
          },
          {
            path: '/result/:id',
            element: <Result />
          },
          {
            path: '/quiz/:id',
            element: <Quiz />
          }
        ]
      }
    ]
  }
]