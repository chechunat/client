import React from 'react';
import { ReactComponent as YoutubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/svg/linkedin.svg';

import './SocialLinks.scss';


export default function SocialLinks() {
    return (
        <div className="social-links">
            <a 
            href="https://www.youtube.com/channel/UCUEyJN5Z7zRzOi3FrMHGRFQ?view_as=subscriber"
            className="youtube"
            target="_blank"
            rel="noopener noreferrer"
            >
                <YoutubeIcon/>
            </a>

            <a 
            href="https://twitter.com/chechunat"
            className="twitter"
            target="_blank"
            rel="noopener noreferrer"
            >
                <TwitterIcon/>
            </a>

            <a 
            href="https://www.facebook.com/chechu.palacin"
            className="facebook"
            target="_blank"
            rel="noopener noreferrer"
            >
                <FacebookIcon/>
            </a>
            
            <a 
            href="https://www.linkedin.com/in/sergio-gonz%C3%A1lez-palacin-0310971ab/"
            className="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            >
                <LinkedinIcon/>
            </a>


            
        </div>
    )
}