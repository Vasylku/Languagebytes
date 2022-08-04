import React from 'react';
import './footer.css';

import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About</h2>
                        <a href='https://www.southeastern.edu/admin/cs/help/index.html'>Help Desk</a>
                        <Link to='/resource'>Resources</Link>
                        <Link to='/dashboard'>My Account</Link>
                        <Link to='/register'> Sign Up</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>More Info</h2>
                        <Link to='/contact'>Contact</Link>
                        <Link to='/curriculum'>Curriculum</Link>
                        <a href='https://www.southeastern.edu/map/'>Campus Map</a>
                        <a href="https://www2.southeastern.edu/external/esl_registration/">Apply</a>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <a href='https://www.instagram.com/southeastern_esl/'>Instagram</a>
                        <a href='https://www.facebook.com/southeasternesl/'>Facebook</a>
                        <a href='https://www.youtube.com/user/southeasternvideo'>Youtube</a>
                        <a href='https://twitter.com/oursoutheastern'>Twitter</a>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Games</h2>
                        <a href='https://www.duolingo.com/'>Duolingo</a>
                        <a href='https://www.gamestolearnenglish.com/'>Games</a>
                        <a href='https://playinfluent.com/'>Influent</a>
                        <a href='http://iteslj.org/games/'>Games&Activities</a>
                    </div>
                </div>
            </div>
            <div className='footer-links'>
                <div className='social-media'>
                    <div className='social-media-wrapper'>
                        <div className='social-icons'>
                            <a
                                className='social-icon-link facebook'
                                href='https://www.facebook.com/southeasternesl/'
                                target='_blank'
                                aria-label='Facebook'>
                                <i className='fab fa-facebook-f' />
                            </a>
                            <a
                                className='social-icon-link instagram'
                                href='https://www.instagram.com/southeastern_esl/'
                                target='_blank'
                                aria-label="Instagram" >
                                <i className='fab fa-instagram' />
                            </a>
                            <a
                                className='social-icon-link youtube'
                                href='https://www.youtube.com/user/southeasternvideo'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i className='fab fa-youtube' />
                            </a>
                            <a
                                className='social-icon-link twitter'
                                href='https://twitter.com/oursoutheastern'
                                target='_blank'
                                aria-label='Twitter' >
                                <i className='fab fa-twitter' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

