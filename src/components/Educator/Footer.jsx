import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 
    text-center border-t '>
      <div className='flex items-center gap-4'>
        <img src={assets.logo} alt="logo" className='hidden md:block w-20' />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <div>
          <p className='py-3 text-xs md:text-sm text-center text-gray-500'>Copyright 2025 &coppy; Adem Hoş. All Rights Reserved</p>
        </div>
        <div className='flex items-center gap-3 max-md:mt-4'>
          <a href="#">
            <img src={assets.instagram_icon} alt="instagram icon" />
          </a>
          <a href="#">
            <img src={assets.facebook_icon} alt="facebook icon" />
          </a>
          <a href="#">
            <img src={assets.twitter_icon} alt="twitter icon" />
          </a>
        </div>
      </div>

    </footer>
  )
}

export default Footer
