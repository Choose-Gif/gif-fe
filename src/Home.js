import React, { Component } from 'react'
import request from 'superagent';
import './Home.css';

export default class Home extends Component {
    state = {
        trendingResults: [],
        trendingList: [],
        imageUrl: []
    }

    componentDidMount = async () => {
        await this.fetchTrending()
        await this.fetchTrendingList()     
    }


    fetchTrending = async () => {
        try {
            const response = await request.get(`https://choose-gif-be.herokuapp.com/trending`);
            await this.setState({ 
                trendingResults: response.body.data, 
                imageUrl: response.body.data.map( item => item.images.original.url) });
            
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


    render() {
        console.log(this.state.trendingResults[0])
        return (
            <div>
                <div className="scene">
                    <div className="cube">
                        <div className="cube-face cube-face-front">
                            <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[0]} />
                            </a>
                        </div>
                        <div className="cube-face cube-face-back">
                            <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[1]} />
                            </a>
                        </div>
                        <div className="cube-face cube-face-right">
                        <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[2]} />
                            </a>
                        </div>
                        <div className="cube-face cube-face-left">
                        <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[3]} />
                            </a>
                        </div>
                        <div className="cube-face cube-face-top">
                        <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[4]} />
                            </a>
                        </div>
                        <div className="cube-face cube-face-bottom">
                        <a href="https://giphy.com/search/rocket-launch">
                            <img alt='test gif' src={this.state.imageUrl[5]} />
                            </a>
                        </div>
                    </div>
                </div>
                <div id='trending-terms'>
                {this.state.trendingList.map(oneItem => {
                    return <div key={oneItem} className='trending-item'>#{oneItem}</div>
                })}
                </div>
            </div>
        )
    }
}
