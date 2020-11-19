import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch
} from "react-router-dom";
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import Favorites from './Favorites.js'
import Search from './Search.js'
import Home from './Home.js'
import About from './About.js'
import Header from './Header.js'
import PrivateRoute from './PrivateRoute.js';
import request from 'superagent';
import './App.css';

export default class App extends Component {

  state = { 
    token: localStorage.getItem('TOKEN') || '',
    query: '',
    searchResults: [],
    newFavorites: []
  }

  handleTokenChange = (myEmail, myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  handleSubmit = async e => {
    const response = await request
   .get(`https://choose-gif-be.herokuapp.com/search?query=${this.state.query}`)
   this.setState({ searchResults: response.body.data, query: '' });
    if(this.state.token!==''){
      await this.fetchFavorites();
    }
  }

  handleCategory = async (category) => {
    const response = await request
   .get(`https://choose-gif-be.herokuapp.com/search?query=${category}`)
   await this.setState({ searchResults: response.body.data, query: '' });
  }

  handleInput = async e => {
    this.setState({ query: e.target.value })
  }

  handleLogOut = () => {
    localStorage.setItem('TOKEN', '');
    this.setState({ token: '' })
  }

  //FETCH FAVORITES
  fetchFavorites = async () => {
    const response = await request
      .get('https://choose-gif-be.herokuapp.com/api/favorites/')
      .set('Authorization', this.state.token)
      
      this.setState({ newFavorites: response.body })
  }

  //MAKE A NEW FAVORITE
  handleFavorite = async (oneItem) => {

    const newFavorite = {
      giphy_id: oneItem.id,
      title: oneItem.title
    };
    try {
    await request
      .post('https://choose-gif-be.herokuapp.com/api/favorites/')
      .set('Authorization', this.state.token)
      .send(newFavorite)

    await this.fetchFavorites();
  } catch(err) {
    
  }
  }

  //DELETE FAVORITE
  handleDeleteFavorite = async (favoriteId) => {
    try {
      await request
        .delete(`https://choose-gif-be.herokuapp.com/api/favorites/${favoriteId}`)
        .set('Authorization', this.state.token)

        await this.fetchFavorites();

    } catch(err) {
      throw err;
    }
  }
  
  render() {
    return (
      <div>
        <Router>
        <Route render={(routerProps) => <Header         
            token={this.state.token}
            query={this.state.query}
            handleLogOut={this.handleLogOut}
            handleSubmit={this.handleSubmit}
            handleTokenChange={this.handleTokenChange} 
            handleInput={this.handleInput}
            handleCategory={this.handleCategory}
            categories = {this.state.categories}
                {...routerProps} />} 
              />
          <Switch>

            <Route exact path='/signin' render={(routerProps) => <SignIn 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            <Route 
            exact path='/signup' 
              render={(routerProps) => <SignUp 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <Route 
            exact path='/about' 
              render={(routerProps) => <About 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <Route 
            exact path='/search' 
              render={(routerProps) => <Search 
                handleTokenChange={this.handleTokenChange} 
                searchResults = {this.state.searchResults}
                handleInput={this.handleInput} 
                handleSubmit={this.handleSubmit}
                handleCategory={this.handleCategory}
                handleFavorite={this.handleFavorite}
                fetchFavorites={this.fetchFavorites}
                newFavorites={this.state.newFavorites}
                handleDeleteFavorite={this.handleDeleteFavorite}
                {...routerProps}/>} 
              />
            <Route 
            exact path='/' 
              render={(routerProps) => <Home 
                handleTokenChange={this.handleTokenChange} 
                handleCategory={this.handleCategory}
                {...routerProps}/>} 
              />
            <PrivateRoute 
              exact 
              path='/favorites' 
              token={this.state.token} 
              render={(routerProps) => <Favorites token={this.state.token}
              handleTokenChange={this.handleTokenChange}
              fetchFavorites={this.fetchFavorites}
              handleDeleteFavorite={this.handleDeleteFavorite}
              fetchGiphyFavorites={this.fetchGiphyFavorites}
              searchResults = {this.state.newFavorites}
              {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}