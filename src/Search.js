import React, { Component } from 'react';
import './Search.css';


export default class Search extends Component {

    render() {
        return (
            <div>
                <div className="header-test" >
                <h2>Search Page</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <input 
                        value={this.props.query} 
                        onChange={this.props.handleInput}/>
                    <button>Submit</button>
                </form>
                </div>
                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                            <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                            <p className="item-text">Title: {oneItem.title}</p>
                            </div>
                            {/* <p className="item-text">Url: {oneItem.images.original.url}</p> */}
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}
