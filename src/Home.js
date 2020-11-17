import React, { Component } from 'react'
import request from 'superagent';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Home.css';

export default class Home extends Component {
    state = {
        trendingResults: [],
        trendingList: [],
        imageUrl: [],
        imageTitle: [],
        copied: false,
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
                imageUrl: response.body.data.map( item => item.images.original.url),
                imageTitle: response.body.data.map( item => item.title) });
                
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
        return (
            <div className="parent-container">
                <div className="scene">
                    <div className="cube">
                        <div className="cube-face cube-face-front">
                            <CopyToClipboard text={this.state.imageUrl[0]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[0]} src={this.state.imageUrl[0]} />
                            </CopyToClipboard>
                        </div>
                        <div className="cube-face cube-face-back">
                            <CopyToClipboard text={this.state.imageUrl[1]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[1]} src={this.state.imageUrl[1]} />
                            </CopyToClipboard>
                        </div>
                        <div className="cube-face cube-face-right">
                            <CopyToClipboard text={this.state.imageUrl[2]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[2]} src={this.state.imageUrl[2]} />
                            </CopyToClipboard>
                        </div>
                        <div className="cube-face cube-face-left">
                            <CopyToClipboard text={this.state.imageUrl[3]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[3]} src={this.state.imageUrl[3]} />
                            </CopyToClipboard>
                        </div>
                        <div className="cube-face cube-face-top">
                            <CopyToClipboard text={this.state.imageUrl[4]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[4]} src={this.state.imageUrl[4]} />
                            </CopyToClipboard>
                        </div>
                        <div className="cube-face cube-face-bottom">
                            <CopyToClipboard text={this.state.imageUrl[5]}
                            onCopy={() => this.setState({copied: true})}>
                            <img className="cube-images" alt={this.state.imageTitle[5]} src={this.state.imageUrl[5]} />
                            </CopyToClipboard>
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
