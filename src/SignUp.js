import React, { Component } from 'react';
import request from 'superagent';
import './SignUp.css';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmitSignUp = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })

        const user = await request
            .post('https://choose-gif-be.herokuapp.com/auth/signup')
            .send(this.state)

        this.setState({ loading: false })

        this.props.handleTokenChange(user.body.email, user.body.token)

        this.props.history.push('/search');
    }


    render() {
        return (
            <div className='signup-div'>
                <div className='signup-content'>
                    Sign Up
                    <form
                     onSubmit={this.handleSubmitSignUp}
                     className='signup-form'>
                        <label>
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
                        {
                            this.state.loading
                            ? 'Loading'
                            : <button>
                                Sign Up
                            </button>
                        }
                    </form>

                </div>
            </div>
        )
    }
}
