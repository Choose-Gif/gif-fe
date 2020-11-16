import React, { Component } from 'react';
import './Search.css';


export default class Search extends Component {

    render() {
        return (
            <div>
                <h2>Search Page</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <input 
                        value={this.props.query} 
                        onChange={this.props.handleInput}/>
                    <button>Submit</button>
                </form>
                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div classname="individual" key={`${oneItem.title}${Math.random()}`}>
                            <img className="item-picture" src={oneItem.images.original.url} alt={oneItem.title}></img>
                            <p className="item-text">Title: {oneItem.title}</p>
                            {/* <p className="item-text">Url: {oneItem.images.original.url}</p> */}
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}
