import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'
function Footer() {
    const handleClick = (e) => {
        e.preventDefault()
    }
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the membership
        </p>
        <p className='footer-subscription-text'>
          You can terminate your membership at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button onClick = {handleClick} className ='btnSection btnFooter'>Join</button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <div style = {{fontSize : "25px", fontWeight : "bold", marginBottom : "10px"}}>About Us</div>
            <Link to='/'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
          </div>
          <div class='footer-link-items'>
          <div style = {{fontSize : "25px", fontWeight : "bold", marginBottom : "10px"}}>Contact Us</div>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <div style = {{fontSize : "25px", fontWeight : "bold", marginBottom : "10px"}}>Social Media</div>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
          <div class='footer-link-items'>
          <div style = {{fontSize : "25px", fontWeight : "bold", marginBottom : "10px"}}>Legal</div>
            <Link to='/'>Terms of Service</Link>
            <Link to='/'>Privacy</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
             Your Choice
              <i class='fa fa-industry' />
            </Link>
            <h4>Less time, good quality, best service.</h4>
          </div>
          <small class='website-rights'>Your Choice © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;