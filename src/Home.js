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
        searchTrendingUrl1: [],
        searchTrendingUrl2: [],
        searchTrendingUrl3: [],
        searchTrendingResults1: [],
    }

    componentDidMount = async () => {
        await this.fetchTrending()
        await this.fetchTrendingList() 
        await this.fetchTrendingTerm(this.state.trendingList[0], this.state.trendingList[1], this.state.trendingList[2])   
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

    fetchTrendingTerm = async (trendingTerm1, trendingTerm2, trendingTerm3) => {
        const response1 = await request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm1}`)
        const response2 = await request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm2}`)
        const response3 = await request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm3}`)
       await this.setState({ 
        searchTrendingUrl1: response1.body.data.map( item => item.images.original.url),
        searchTrendingUrl2: response2.body.data.map( item => item.images.original.url),
        searchTrendingUrl3: response3.body.data.map( item => item.images.original.url),
        searchTrendingResults1: response1.body.data
        });
    }
    
    handleCategory = async (category) => {
        await this.props.handleCategory(category);
        this.props.history.push('/search');
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
                <div className="box-group">
                    <div className="box-single" onClick={() => this.handleCategory(this.state.trendingList[0])}>
                        <img 
                        className="box-image" 
                        alt={this.state.trendingList[0]} 
                        src={this.state.searchTrendingUrl1} />
                        <div className="box-text">{this.state.trendingList[0]}</div>
                    </div>
                    <div className="box-single" onClick={() => this.handleCategory(this.state.trendingList[1])}>
                        <img 
                        className="box-image" 
                        alt={this.state.trendingList[1]} 
                        src={this.state.searchTrendingUrl2} />
                        <div className="box-text">{this.state.trendingList[1]}</div>
                    </div>
                    <div className="box-single" onClick={() => this.handleCategory(this.state.trendingList[2])}>
                        <img 
                        className="box-image" 
                        alt={this.state.trendingList[2]} 
                        src={this.state.searchTrendingUrl3} />
                        <div className="box-text">{this.state.trendingList[2]}</div>
                    </div>
                </div>
                {/* <div id='trending-terms'>
                {this.state.trendingList.map(oneItem => {
                    return <div key={oneItem} className='trending-item'>#{oneItem}</div>
                })}
                </div> */}
            </div>
        )
    }
}
