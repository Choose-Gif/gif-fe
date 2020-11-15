import React, { Component } from 'react';
import request from 'superagent';

export default class Search extends Component {

    state = {
        query: '',
        searchResults: [],
    }

    componentDidMount = async () => {
        const response = await request
        .get('https://choose-gif-be.herokuapp.com/search?query=cats')
        // .get(`https://choose-gif-be.herokuapp.com/search?query=${this.state.query}`)
        // console.log(this.state.query)
        console.log(response.body.data[0])
        this.setState({ searchResults: response.body.data });
    }


    render() {
        return (
            <div>
                Search Page

                {
                    this.state.searchResults.map(oneItem => 
                        <div>
                            Title: {oneItem.title}
                        </div>

                    )
                }


            </div>
        )
    }
}
