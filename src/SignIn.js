import React, { Component } from 'react';
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
                <div className='signup-text-div'>
                    <div className='signup-email-text'>Email:</div>
                    <div>Password:</div>
                </div>
                <div>
                    <form
                     onSubmit={this.handleSubmitSignIn}
                     className='signup-form'>
                        <label>
                            {err && <div style={{ color: 'red'}}>{err}</div>}
                            <input
                             onChange={(e) => {this.setState({ email: e.target.value })}}
                             value={this.state.email}
                             type="email"
                             />
                        </label>
                        <label>
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
            </div>
        )
    }
}
