import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import withAuthRedirect from './hoc/WithAuthRedirect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const LoginPage = withAuthRedirect(Login, '/')
const RegisterPage = withAuthRedirect(Register, '/')

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      }
    ]
  },
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
