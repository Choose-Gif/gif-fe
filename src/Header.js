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
                <Link to='/'>Home</Link><br />
                <Link to='/favorites'>Favorites 🌟</Link><br />
                <Link to='/about'>About Us 👋</Link><br />
                <Link to='/test'>Test</Link>
            </div>
            <div className='header-sign-div'>
                <Link to='/signup'>
                    <button className='header-signup-button'>
                        Sign Up
                    </button>
                </Link>
                <Link to='/signin'>
                    <button className='header-signin-button'>
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
        )
    }
}
