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
                {/* <div className='header-links-div'>
                    <Link to='/'><img className='icons' alt='' src={home}/></Link>
                    <Link to='/about'><img className='icons' alt='' src={about}/></Link>
                </div> */}
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
                <div className="dropdown-m">
                    <button className="drop-button-m">Menu</button>
                    <div className="dropdown-content-m">
                    { this.props.token 
                    ?
                        <>
                        <span><Link to='/'>Home</Link></span>
                        <span><Link to='/favorites'>My <img className='icons' alt='' src={heartFull}/></Link></span>
                        <span >
                            <Link to='/' onClick={this.props.handleLogOut}>
                            Log Out
                            </Link>
                        </span>
                        <span><Link to='/about'>About</Link></span>
                        </>
                        :
                        <>
                        <span><Link to='/'>Home</Link></span>
                        <span ><Link to='/signin'>Sign In</Link></span>
                        <span><Link to='/signup'>Sign Up</Link></span>
                        <span><Link to='/about'>About</Link></span>
                        </>
                    }
                    </div>
                </div>
        </div>
        )
    }
}
