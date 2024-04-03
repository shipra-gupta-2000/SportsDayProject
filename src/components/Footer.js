import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>
        <p className='about'>About: This is our sports day, let's celebrate it with full enthusiasm. 
          Be energetic and spread happiness.</p>
        <p className='address'>Address: 123, xyz street, abc city, 123456</p>
        <p className='phone'>Phone: 1234567890</p>
        <img className='footer-image' src='https://phantom-marca.unidadeditorial.es/cdda17e80082b7060ee1a9d62e41b96b/resize/1320/f/webp/assets/multimedia/imagenes/2024/03/06/17097148565671.png' alt='Sports Day' />
      </div>
      <div className='footer-right'>
        <h2>Get in Touch</h2>
        <form>
          <input type='text' placeholder='Name' /><br />
          <input type='email' placeholder='Email' />
          <textarea placeholder='Message'></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
