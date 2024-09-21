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
import GroupPosts from './components/group/GroupPosts';
import GroupSuggestPosts from './components/group/GroupSuggestPosts';
import GroupBannedUsers from './components/group/GroupBannedUsers';
import PostCreate from './components/post/PostCreate';
import GroupEdit from './components/group/GroupEdit';

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
      },
      {
        path: "/group-create",
        element: <GroupEdit />
      },
      {
        path: "/groups/:groupId",
        element: <Group />,
        children: [
          {
            path: "/groups/:groupId/posts",
            element: <GroupPosts />
          },
          {
            path: "/groups/:groupId/suggest-posts",
            element: <GroupSuggestPosts />
          },
          {
            path: "/groups/:groupId/banned-users",
            element: <GroupBannedUsers />
          },
          {
            path: "/groups/:groupId/create-post",
            element: <PostCreate />
          }
        ]
      },
      {
        path: "/profile",
        element: <UserProfile />,
        children: [
          {
            path: "/profile/:id/groups",
            element: <GroupList />
          },
          {
            path: "/profile/:id/friends",
            element: <div>Groups</div>
          },
          {
            path: "/profile/:id/requests",
            element: <div>Requests</div>
          },
          {
            path: "/profile/:id/comments",
            element: <div>Comments</div>
          },
          {
            path: "/profile/:id/posts",
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
