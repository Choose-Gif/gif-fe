import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import request from 'superagent';

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

        console.log(this.state.newFavorites)
        this.state.newFavorites.forEach(element => {
            favoritesList += ',' + element.giphy_id;
        });
        favoritesList = favoritesList.substring(1);

        if(favoritesList !==''){
            await this.fetchGiphyFavorites(favoritesList)
            console.log(this.state.currentFavorites)
            await this.fetchFavorites()

        }

    }

    fetchFavorites = async () => {
        const response = await request
          .get('https://choose-gif-be.herokuapp.com/api/favorites/')
          .set('Authorization', this.props.token)
          await this.setState({ newFavorites: response.body })
      }
    
      fetchGiphyFavorites = async (favoritesList) => {
          console.log(`https://choose-gif-be.herokuapp.com/giphy-favorites/${favoritesList}`)
        const response = await request
          .get(`https://choose-gif-be.herokuapp.com/giphy-favorites/${favoritesList}`)
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
                <div className="group">
                    {console.log(this.state.currentFavorites.data)}
                { (this.state.currentFavorites.data !== undefined) ?
                    this.state.currentFavorites.data.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                                <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                                <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />

                                {this.state.newFavorites.find( oneFavorite => oneFavorite.giphy_id === oneItem.id)
                                ? <button 
                                    onClick={() => this.handleClickDeleteFavorite(oneItem.id)}>💖</button>
                                : <button
                                    onClick={() => this.props.handleFavorite(oneItem)}
                                    className="favorite-button">♡</button>
                                    }

                                <CopyToClipboard text={oneItem.images.original.url}
                                onCopy={() => this.setState({copied: true})}>
                                <button className="item-button">Copy to Clipboard</button>
                                </CopyToClipboard>
                                </p>
                            </div>
                        </div>
                    )
                    : <div>'loading'</div>
                }
                </div>
            </div>
        )
    }
}
