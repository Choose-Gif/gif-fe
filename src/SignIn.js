import React, { Component } from 'react';
import { Link } from "react-router-dom";
import request from 'superagent';
import './SignUp.css';

//Currently uses SignUp.css and 'signup' classNames for styling

export default class SignIn extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
        err: null
    }

    handleSubmitSignIn = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })

        try {

        const user = await request
            .post('https://choose-gif-be.herokuapp.com/auth/signin')
            .send(this.state)

        this.setState({ loading: false })

        this.props.handleTokenChange(user.body.email, user.body.token)

        this.props.history.push('/favorites');
    } catch(err) {
        this.setState({ err: 'Email or Password Invalid'})
        
    };

    }


    render() {
        const { err } = this.state;
        return (
            <div className='signup-div'>
                <div className='signup-content'>
                    Sign In
                    <form
                     onSubmit={this.handleSubmitSignIn}
                     className='signup-form'>
                        <label>
                            {err && <div style={{ color: 'red'}}>{err}</div>}
                            Email:
                            <input
                             onChange={(e) => {this.setState({ email: e.target.value })}}
                             value={this.state.email}
                             type="email"
                             />
                        </label>
                        <label>
                            Password:
                            <input
                             onChange={(e) => {this.setState({ password: e.target.value })}}
                             value={this.state.password}
                             type="password"
                            />
                        </label>
                        <button className='signup-button'>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className='go-to-signup-div'>
                    <p>
                        If you are not a user, you can sign up here:
                    </p>
                
                    <Link to='/signup'>
                            <button className='header-signup-button go-to-signup-button'>
                                Sign Up
                            </button>
                        </Link>

                </div>
            </div>
        )
    }
}
