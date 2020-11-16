import React, { Component } from 'react';
import request from 'superagent';
import Header from './Header.js';

export default class Search extends Component {

    componentDidMount = async () => {
     
    }

    render() {
        return (
            <div>
                Search Page
                    <form onSubmit={this.props.handleSubmit}>
                        <input 
                            value={this.props.query} 
                            onChange={this.props.handleInput}/>
                        <button>Submit</button>
                    </form>
                {
                    this.props.searchResults.map(oneItem => 
                        <div>
                            Title: {oneItem.title}
                        </div>
                    )
                }


            </div>
        )
    }
}
