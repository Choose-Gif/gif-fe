import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default class Header extends Component {


    // handleLogOut = () => {
    //     localStorage.setItem('TOKEN', '');
    //     this.setState({ token: '' })
    // }

    // fakeHandleSignIn = () => {
    //     this.setState({ token: 'token' })
    // }
    
    render() {
        return (
            <div className='header-div'>

                {/* Search Button links to Search.js */}
                <div className='header-search-div'>
                <Link to='/search'>
                    <button className='header-search-button'>
                        Search
                    </button>
                </Link>
                </div>

                {/* Header text links (non-button) */}
                <div className='header-links-div'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About Us 👋</Link>
                </div>

                {/* Favorites "STAR ICON" (when logged in) */}
                <div className='favorites-div'>
                    { this.props.token && <Link to='/favorites' className='favorites-link'>🌟</Link> }
                </div>

                {/* Sign Up/Sign In and Log Out buttons */}
                <div className='header-sign-div'>
                    { !this.props.token && 
                        <Link to='/signup'>
                            <button className='header-signup-button'>
                                Sign Up
                            </button>
                        </Link>
                    }
                    { !this.props.token && 
                        <Link to='/signin'>
                            <button
                            // onClick={this.fakeHandleSignIn}
                            className='header-signin-button'>
                                Sign In
                            </button>
                        </Link>
                    }
                    <div className='header-logout-div'>
                    { this.props.token &&
                    <Link to='/'>
                        <button
                        onClick={this.props.handleLogOut}
                        className='header-logout-button'>
                            Log Out
                        </button>
                    </Link>
                    }
                </div>
            </div>
        </div>
        )
    }
}
