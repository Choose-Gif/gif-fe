import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import heartEmpty from './heart-empty-icon.png';
import heartFull from './heart-full-icon.png';
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
        console.log(this.props.token)
        return (
            <div className="search-parent">
                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                                <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                                <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />

                                {this.props.newFavorites.find(oneFavorite => oneFavorite.giphy_id === oneItem.id)
                                ?  <img 
                                    alt='favorited gif' 
                                    src={heartFull}
                                    onClick={() => this.handleClickDeleteFavorite(oneItem.id)} className="heart-icons"/>
                                : <div className="tooltip">
                                    <img 
                                    alt='gif not favorited' 
                                    src={heartEmpty}
                                    onClick={() => this.props.handleFavorite(oneItem)} className="heart-icons"/>

                                    {this.props.token === '' 
                                    ?
                                    <span className="tool-tip-text">Sign In to Save</span>
                                    : <span></span>}
                                    </div>
                                }
                                <CopyToClipboard text={oneItem.images.original.url}
                                onCopy={() => this.setState({copied: true})}>
                                <button className="item-button">Copy URL</button>
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