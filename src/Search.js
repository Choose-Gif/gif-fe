import React, { Component } from 'react';
import './Search.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default class Search extends Component {

    state = {
        value: '',
        copied: false,
      };

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



















{/* Line 44 is the border */}













                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                            <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                            <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />
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
