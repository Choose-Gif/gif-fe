import React, { Component } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Search.css';

export default class Search extends Component {

    state = {
        value: '',
        copied: false,
        favorite: false
      };

    //CLICK HANDLER TO DELETE FAVORITE
    handleClickDeleteFavorite = async (id) => {
        await this.props.handleDeleteFavorite(id)
    }

    render() {
        return (
            <div className="search-parent">
                <h2>Search Page</h2>
                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                            <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                            <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />


                                {/* NEW BUTTON STARTS HERE */}
                                {/* { this.state.favorite === false &&
                                <button
                                 onClick={ () => this.setState({ favorite: true })}
                                 className='favorite-button'>♡</button>
                                }
                                { this.state.favorite === true &&
                                <button
                                 onClick={ () => this.setState({ favorite: false })}
                                 className='favorite-button'>💖</button>
                                } */}
                                {/* NEW BUTTON ENDS HERE */}



    {this.props.newFavorites.find( oneFavorite => oneFavorite.giphy_id === oneItem.id)
    ? <button
        onClick={() => this.handleClickDeleteFavorite(oneItem.id)}
        >💖</button>
     : <button
     onClick={() => this.props.handleFavorite(oneItem)}
     className='favorite-button'>♡</button>
    }


                                <CopyToClipboard text={oneItem.images.original.url}
                                onCopy={() => this.setState({copied: true})}>
                                <button className="item-button">Copy to Clipboard</button>
                                </CopyToClipboard>
                            </p>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}