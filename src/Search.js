import React, { Component } from 'react';
import request from 'superagent';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Search.css';

export default class Search extends Component {

    state = {
        value: '',
        copied: false,
        categories: [],
        subCategories: [],
        categoryResults: [],
        favorite: false
      };

    componentDidMount = async () => {
        await this.fetchCategories()
    }

    fetchCategories = async () => {
        try {
            const response = await request.get(`https://api.giphy.com/v1/gifs/categories?api_key=YipqcygnSfwA4INWcd6BhsBNrAEPY7AZ`);
            await this.setState({ categories: response.body.data });
        } catch(err) {
            throw err;
        }
    }      

    render() {

        return (
            <div className="search-parent">
                <div className="header-search" >
                    <h2>Search Page</h2>
                    <form onSubmit={this.props.handleSubmit}>
                        <input 
                            value={this.props.query} 
                            onChange={this.props.handleInput}/>
                        <button>Submit</button>
                    </form>
                </div>
                <div className="dropdown">
                    <button className="drop-button">Categories</button>
                    <div className="dropdown-content">
                        {
                        this.state.categories.map(category => {
                                return <span 
                                onClick={() => this.props.handleCategory(category.name)}>
                                {category.name}</span>
                            })
                        }
                    </div>
                </div>






























{/* Line 44 was the border; now Line 65 is the border */}










                <div className="group">
                {
                    this.props.searchResults.map(oneItem => 
                        <div key={`${oneItem.title}${Math.random()}`}>
                            <div className="individual">
                            <img className="item-picture" src={oneItem.images.downsized_medium.url} alt={oneItem.title}></img>
                            <p>
                                <input className="item-input" value={oneItem.images.original.url} type="hidden" />


                                {/* NEW BUTTON STARTS HERE */}


                                { this.state.favorite === false &&
                                <button
                                 onClick={ () => this.setState({ favorite: true })}
                                 className='favorite-button'>♡</button>
                                }
                                { this.state.favorite === true &&
                                <button
                                 onClick={ () => this.setState({ favorite: false })}
                                 className='favorite-button'>💖</button>
                                }

                                {/* NEW BUTTON ENDS HERE */}



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



// CHANGES MADE ABOVE MY ZONE
// npm install reactjs-popup --save
// Line 4: import Popup from 'reactjs-popup';
// Line 10: Add "favorite: false" to state.