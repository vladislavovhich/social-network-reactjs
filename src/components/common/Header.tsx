import React from 'react';
import ReactDOM from 'react-dom/client';
import "../../styles/header.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { UserTop } from '../user/UserTop';
import { logout as logoutThunk } from '../../store/reducers/auth.slice';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized)
    const user = useSelector((state: RootState) => state.auth.user)

    const logout = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(logoutThunk())
    }
  
    return (
        <header className='bg-dark Header'>
            <div className='container'>
                <nav className="navbar navbar-dark justify-content-between">
                    <a className="navbar-brand" href="#">SocialNetwork</a>
                    
                    <div className='d-flex flex-row'>
                        {
                            (!isAuthorized && !user) ? (
                                <>
                                    <Link to="/login">
                                        <input type="button" value="Sign in" className='btn btn-success ms-3'/>
                                    </Link>

                                    <Link to="/register">
                                        <input type="button" value="Sign up" className='btn btn-primary ms-2 text-white'/>
                                    </Link>
                                </>
                            ) : (
                                user && <>
                                    <UserTop username={user.username} userId={user.id} pfp={user.pfp ? user.pfp.url : ''} />
                                    <input type="button" value="Sign out" className='btn btn-danger ms-3' onClick={logout}/>

                                </>
                            )
                        }
        
                    </div>
                </nav>
            </div>
        </header>
    );
}
  
export default Header;
  