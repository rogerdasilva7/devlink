import './App.css';
import { createBrowserRouter } from 'react-router';
import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Networks } from './pages/networks';
import { Private } from './routes/Private';
import { Errorpage } from './pages/error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/admin",
    element: <Private><Admin/></Private>
  },
  {
    path: "/admin/social",
    element:  <Private><Networks/></Private>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "*",
    element: <Errorpage/>
  }
])

export { router };