import React, { Component } from 'react';
import request from 'superagent';
import './SignUp.css';

export default class SignIn extends Component {

    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmitSignIn = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })

        const user = await request
            .post('https://choose-gif-be.herokuapp.com/auth/signin')
            .send(this.state)

        this.setState({ loading: false })

        this.props.handleTokenChange(user.body.email, user.body.token)

        this.props.history.push('/favorites');
    }


    render() {
        return (
            <div className='signin-div'>
                <div className='signin-content'>
                    Sign In
                    <form
                     onSubmit={this.handleSubmitSignIn}
                     className='signin-form'>
                        <label>
                            Email:
                            <input
                             onChange={(e) => {this.setState({ email: e.target.value })}}
                             value={this.state.email}
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
                                Sign In
                            </button>
                        }
                    </form>

                </div>
            </div>
        )
    }
}
