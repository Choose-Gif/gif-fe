import React, { Component } from 'react'
import './About.css';
import bryana from './bryana.jpg';
import franco from './franco.jpg';
import kevin from './kevin.jpg';

export default class About extends Component {
    render() {
        return (

                <main className='column main-section'>
                    <section className='about column'>
                        <h2>Bryana</h2>
                        <img className='about-pic' alt='' src={bryana}/>
                        <div className='about-blurb'>Born and raised in the Mitten, Bryana enjoys spending time outside in nature or at a live music event.  She prides herself in tackling new projects and hobbies such as fluid painting and roller derby.</div>
                    </section>
                    <section className='about column'>
                        <h2>Franco</h2>
                        <img className='about-pic' alt='' src={franco}/>
                        <div className='about-blurb'>Franco is a longtime Portlander who enjoys biking around the city, climbing artificial rock walls, playing boardgames, and making fantasy world maps. A tarot reading was one of the many nudges that led him down the road of software development.</div>
                    </section>
                    <section className='about column'>
                        <h2>Kevin</h2>
                        <img className='about-pic' alt='' src={kevin}/>
                        <div className='about-blurb'>Kevin just moved to Portland this summer and has previously lived in New York, Texas, and Michigan. His hobbies include rock climbing, 3D printing, and board games.</div>
                    </section>
                </main>

        )
    }
}
