import React, { Component } from 'react'
import request from 'superagent';
import './Home.css';

export default class Home extends Component {
    state = {
        trendingResults: [],
        trendingList: []
    }

    fetchTrending = async () => {
        try {
            const response = await request.get(`https://choose-gif-be.herokuapp.com/trending`);
            await this.setState({ trendingResults: response.body.data });
            
        } catch(err) {
            throw err;
        }
    }

    fetchTrendingList = async () => {
        try {
            const response = await request.get(`https://choose-gif-be.herokuapp.com/trendinglist`);
            await this.setState({ trendingList: response.body.data });
            
        } catch(err) {
            throw err;
        }
    }

    componentDidMount = async () => {
        await this.fetchTrending()
        await this.fetchTrendingList()     
    }


    render() {
        return (
            <div>
                <div id='trending-gifs'>
                {this.state.trendingResults.map(oneItem => {
                    return <img key={oneItem.id + '_img'} alt='' src={oneItem.images.original.url}/>

                })}
                </div>
                <div id='trending-terms'>
                {this.state.trendingList.map(oneItem => {
                    return <div key={oneItem} className='trending-item'>{oneItem}</div>
                })}
                </div>

            </div>
        )
    }
}
