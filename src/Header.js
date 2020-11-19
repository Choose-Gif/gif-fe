import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import request from 'superagent';
import home from './home-icon.png';
import about from './about-icon.png';
import heartFull from './heart-full-icon.png';
import search from './search-sm-icon.png';

export default class Header extends Component {
    state = {
        categories: [],
        subCategories: [],
        categoryResults: []
    }

    componentDidMount = async () => {
        await this.fetchCategories()
    }

    fetchCategories = async () => {
        try {
            const response = await request.get(`https://api.giphy.com/v1/gifs/categories?api_key=YipqcygnSfwA4INWcd6BhsBNrAEPY7AZ`);
            await this.setState({ categories: response.body.data });
        } catch(err) {
            throw err;
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.handleSubmit();
        this.props.history.push('/search');
    }

    handleCategory = async (category) => {
        await this.props.handleCategory(category);
        this.props.history.push('/search');
    }
    
    render() {
        return (
            <div className='header-div'>
                                <div className='header-links-div'>
                    {/* <Link to='/'><button>Home</button></Link> */}
                    <Link to='/'><img className='icons' alt='' src={home}/></Link>
                    <Link to='/about'><img className='icons' alt='' src={about}/></Link>
                </div>
                <div className='header-search-div'>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            value={this.props.query} 
                            onChange={this.props.handleInput}/>
                        <button 
                        className="sm-button test-button"><img className='icons' alt='search icon' src={search}/> </button>   
                    </form>
                </div>
                <div className="dropdown">
                    <button className="drop-button">Categories</button>
                    <div className="dropdown-content">
                        {
                        this.state.categories.map(category => {
                                return <span key={category.name} onClick={() => this.handleCategory(category.name)}>
                                    {category.name}</span>
                            })
                        }
                    </div>
                </div>

                {/* Favorites "STAR ICON" (when logged in) */}
                <div className='favorites-div'>
                    { this.props.token && <Link to='/favorites' className='favorites-link'><img className='icons' alt='' src={heartFull}/></Link> }
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
