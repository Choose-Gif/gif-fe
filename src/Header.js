import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default class Header extends Component {


   handleSubmit = async (e) => {
       e.preventDefault();
       await this.props.handleSubmit();
       this.props.history.push('/search');
   }
    
    render() {
        return (
            <div className='header-div'>
                <div className='header-search-div'>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            value={this.props.query} 
                            onChange={this.props.handleInput}/>    
                        <button>Submit</button>    
                    </form>
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
