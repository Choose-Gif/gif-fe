import React, { Component } from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link
} from "react-router-dom";
import './Header.css';

export default class Header extends Component {

    state = {
        token: 'token'
    }
    
    render() {
        return (
        <div className='header-div'>
            <div className='header-search-div'>
            <Link to='/search'>
                <button className='header-search-button'>
                    Search
                </button>
            </Link>
            </div>
            <div className='header-links-div'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About Us 👋</Link>
                { this.state.token && <Link to='/favorites' className='favorites-link'>🌟</Link> }
                
            </div>
            <div className='header-sign-div'>
            { !this.state.token && 
                <Link to='/signup'>
                    <button className='header-signup-button'>
                        Sign Up
                    </button>
                </Link>
            }
            { !this.state.token && 
                <Link to='/signin'>
                    <button className='header-signin-button'>
                        Sign In
                    </button>
                </Link>
            }
                <div>
                { this.state.token &&
                <Link to='/'>
                    <button className='header-signin-button'>
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
