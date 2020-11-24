import React, { Component } from 'react'
import './About.css';
import bryana from './bryana.jpg';
import franco from './franco.jpg';
import kevin from './kevin.jpg';
import linkedin from './linkedin.svg';
import github from './github.svg';

export default class About extends Component {
    render() {
        return (
            <main className='column main-section '>
                <section className='about column border'>
                    <h2 className='name mobile'>Bryana Kitchen</h2>
                    <div className='orientation center'>
                        <div className='column center'>
                            <img className='about-pic' alt='Bryana' src={bryana} />
                            <div className='row icon-container'>
                                <a href="https://www.linkedin.com/in/bryanakitchen" rel='noreferrer' target="_blank"><img alt='' src={linkedin} /></a>
                                <a href="https://github.com/bryanakitchen" rel='noreferrer' target="_blank"><img alt='' src={github} /></a>
                            </div>
                        </div>
                        <div className='column center desktop-div'>
                            <h2 className='name desktop desktop-column'>Bryana Kitchen</h2>
                            <div className='about-blurb'>Born and raised in the Mitten, Bryana enjoys spending time outside in nature or at a live music event.  She prides herself in tackling new projects and hobbies such as fluid painting and roller derby.</div>
                        </div>
                    </div>
                </section>
                <section className='about column border'>
                    <h2 className='name mobile'>Franco Ortega</h2>
                    <div className='orientation center'>
                        <div className='column center'>
                            <img className='about-pic' alt='Franco' src={franco} />
                            <div className='row icon-container'>
                                <a href="https://www.linkedin.com/in/francoortega" rel='noreferrer' target="_blank"><img alt='' src={linkedin} /></a>
                                <a href="https://github.com/franco-ortega" rel='noreferrer' target="_blank"><img alt='' src={github} /></a>
                            </div>
                        </div>
                        <div className='column center desktop-div'>
                            <h2 className='name desktop desktop-column'>Franco Ortega</h2>
                            <div className='about-blurb'>Franco is a longtime Portlander who enjoys biking around the city, climbing artificial rock walls, playing boardgames, and making fantasy world maps.</div>
                        </div>
                    </div>
                </section>
                <section className='about column border'>
                    <h2 className='name mobile'>Kevin Fiero</h2>
                    <div className='orientation center'>
                        <div className='column center'>
                            <img className='about-pic' alt='Kevin' src={kevin} />
                            <div className='row icon-container'>
                                <a href="https://www.linkedin.com/in/kevinfiero" rel='noreferrer' target="_blank"><img alt='' src={linkedin} /></a>
                                <a href="https://github.com/kevinfiero" rel='noreferrer' target="_blank"><img alt='' src={github} /></a>
                            </div>
                        </div>
                        <div className='column center desktop-div'>
                            <h2 className='name desktop desktop-column'>Kevin Fiero</h2>
                            <div className='about-blurb'>Kevin just moved to Portland this summer and has previously lived in New York, Texas, and Michigan. His hobbies include rock climbing, 3D printing, and board games.</div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}
