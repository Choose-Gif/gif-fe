import React, { Component } from 'react'
import request from 'superagent';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Home.css';

class Cube extends Component {

    render() {
        return  <div className="cube">
        {/* also, would have liked to see some creative mapping here: */}
        {
            ['front', 'back', 'right', 'left', 'top', 'bottom'].map((item, index) => 
                <div className={`cube-face cube-face-${item}`}>
                <CopyToClipboard text={this.props.imageUrl[index]}
                onCopy={() => this.setState({copied: true})}>
                <img className="cube-images" alt={this.props.imageTitle[index]} src={this.props.imageUrl[0]} />
                </CopyToClipboard>
            </div>
            )   
        }

    </div>
    }
}


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
        // Promise.all would shoot the requests off at the same time, as long as the order doesn't matter
        await Promise.all([
            fetchTrending(),
            this.fetchTrendingList(),
            this.fetchTrendingTerm(
                this.state.trendingList[0], 
                this.state.trendingList[1], 
                this.state.trendingList[2])
        ]) 
    }

    fetchTrending = async () => {
        try {
            // I would have liked to see all these fetched defined somewhere else instead of clogging up your component logic
            const response = await request.get(`https://choose-gif-be.herokuapp.com/trending`);
            await this.setState({ 
                trendingResults: response.body.data, 
                imageUrl: this.mungeUrls(response.body.data),
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

    mungeUrls = someArr => someArr.map(item => item.images.original.url);

    fetchTrendingTerm = async (trendingTerm1, trendingTerm2, trendingTerm3) => {
        // this could be a faster fetch using Promise.all
        const [response1, response2, response3] = await Promise.all([
            request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm1}`),
            request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm2}`),
            request.get(`https://choose-gif-be.herokuapp.com/search?query=${trendingTerm3}`),
        ]);
        
       await this.setState({ 
        // might be nice to make this a util
        searchTrendingUrl1: this.mungeUrls(response1.body.data),
        searchTrendingUrl2: this.mungeUrls(response2.body.data),
        searchTrendingUrl3: this.mungeUrls(response3.body.data),
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
                <div className="contain">
                    {/* could be refactored into its own component */}
                    <Cube imageUrl={this.state.imageUrl} imageTitle={this.state.imageTitle}/>
                </div>
                <div className="box-group">
                    {
                        this.state.trendingList.map((item, index) => 
                        <div className="box-single" onClick={() => this.handleCategory(item)}>
                            <img 
                            className="box-image" 
                            style={{ color: '#03060e'}} 
                            alt={item} 
                            src={this.state[`searchTrendingUrls${index + 1}`]} />
                            <div className="box-text">{item}</div>
                        </div>
                        )
                    }
                </div>
        </div>
        )
    }
}
