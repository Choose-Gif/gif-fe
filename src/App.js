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
import './App.css';

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  render() {
    return (
      <div>
        <Router>
          <Header/>
          {/* <ul>
            { this.state.token && <div>welcome, user!!!</div> }
            { this.state.token && <Link to="/todos"><div>todos</div></Link> }
            <Link to="/signin"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            <button onClick={() => this.handleTokenChange('')}>logout</button>
          </ul> */}
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
                {...routerProps}/>} 
              />
            <Route 
            exact path='/' 
              render={(routerProps) => <Home 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <PrivateRoute 
              exact 
              path='/favorites' 
              token={this.state.token} 
              render={(routerProps) => <Favorites token={this.state.token}
              {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}