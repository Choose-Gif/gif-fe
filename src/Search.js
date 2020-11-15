import React, { Component } from 'react';
import request from 'superagent';

export default class Search extends Component {

    state = {
        search: []
    }

    componentDidMount = async () => {
        const response = await request
        .get('https://choose-gif-be.herokuapp.com/search?query=cats')
        
        this.setState({ search: response.body });
    }


    render() {
        return (
            <div>
                Search Page

                {
                    this.state.search.map(oneItem => 
                        <div>
                            Title: {oneItem.title}
                        </div>

                    )
                }


            </div>
        )
    }
}
