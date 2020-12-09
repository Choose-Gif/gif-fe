import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import request from 'superagent';
import heartEmpty from './heart-empty-icon.png';
import heartFull from './heart-full-icon.png';

import { URL } from './App.js';

export default class Favorites extends Component {
    
    state = {
        value: '',
        copied: false,
        favorite: false,
        newFavorites: [],
        currentFavorites: []
    };

    componentDidMount = async () => {
        await this.fetchFavorites()

        let favoritesList =''
        this.state.newFavorites.forEach(element => {
            favoritesList += ',' + element.giphy_id;
        });
        if (favoritesList !=='') {
            await this.fetchGiphyFavorites(favoritesList)
            await this.fetchFavorites()
        }
    }

    fetchFavorites = async () => {
        const response = await request
        // again, it would have been nice to see these fetches living in a separate file instead of being scattered throughout the app
          .get('${URL}/api/favorites/')
          .set('Authorization', this.props.token)
          
          await this.setState({ newFavorites: response.body })
    }
    
    fetchGiphyFavorites = async (favoritesList) => {
        const response = await request
          .get(`${URL}/api/giphy-favorites/${favoritesList}`)
          .set('Authorization', this.props.token)
    
          await this.setState({ currentFavorites: response.body })
    }

    //CLICK HANDLER TO DELETE FAVORITE
    handleClickDeleteFavorite = async (id) => {
        await this.props.handleDeleteFavorite(id)
    }

    render() {
        return (
            <div className="search-parent">
                <h1 className='fav-header'>Favorites</h1>
                <div className="group">
                { (this.state.currentFavorites.data !== undefined) ?
                    this.state.currentFavorites.data.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                                <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                                <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />

                                {/* super cool ternery, hooked against the .find! */}
                                {this.state.newFavorites.find(oneFavorite => oneFavorite.giphy_id === oneItem.id)
                                ? <img 
                                    alt='favorited gif' 
                                    src={heartFull}
                                    onClick={() => this.handleClickDeleteFavorite(oneItem.id)} className="heart-icons"/>
                                : <img 
                                    alt='gif not favorited' 
                                    src={heartEmpty}
                                    onClick={() => this.props.handleFavorite(oneItem)} className="heart-icons"/>
                                }

                                {/* cool find! */}
                                <CopyToClipboard 
                                    text={oneItem.images.original.url}
                                    onCopy={() => this.setState({copied: true})}>
                                    <button className="item-button">Copy URL</button>
                                </CopyToClipboard>
                                </p>
                            </div>
                        </div>
                    )
                    : <div></div>
                }
                </div>
            </div>
        )
    }
}
