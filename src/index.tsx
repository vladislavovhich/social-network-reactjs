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
import UserProfile from './components/user/UserProfile';
import GroupList from './components/group/GroupList';
import Group from './components/group/Group';
import ErrorPage from './components/common/Error';

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
        path: "/error",
        element: <ErrorPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/groups/:groupId",
        element: <Group />
      },
      {
        path: "/profile",
        element: <UserProfile />,
        children: [
          {
            path: "/profile/groups",
            element: <GroupList />
          },
          {
            path: "/profile/friends",
            element: <div>Groups</div>
          },
          {
            path: "/profile/requests",
            element: <div>Requests</div>
          },
          {
            path: "/profile/comments",
            element: <div>Comments</div>
          },
          {
            path: "/profile/posts",
            element: <div>Posts</div>
          },
          {
            path: "/profile/settings",
            element: <div>Settings</div>
          }
        ]
      },
      {
        path: "/profile/:userId",
        element: <UserProfile />
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
