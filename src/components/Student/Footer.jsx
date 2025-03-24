import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-slate-800 mt-10 w-full md:px-36 text-left'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md-gap-32
      py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full '>
          <img src={assets.logo_dark} alt="logo_dark" />
          <p className='mt-6 text-center md:text-left text-white/70 text-sm'>Edemy is an official learning platform. <br/>
          We supporting from large companies around of the world.
          They are recomend us to his employers and using our contents
          in oriantation classes of them.
          </p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col justify-between w-full text-sm text-white/70 md:space-y-2'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
           <h2 className='font-semibold text-white mb-5'>Subrice our to newsletter</h2>
           <p className='text-white/70 text-sm'>The news,coupon codes and free resources comes in your inbox weekly</p>
           <div className='flex items-center gap-2 pt-4'>
            <input className='border border-gray-500/30 text-sm w-64 h-9 rounded bg-slate-800
            outline-none' type="email" placeholder='Enter your email' />
            <button className='bg-blue-500 text-white rounded-md w-24 h-9 hover:bg-blue-600 duration-300 '>Subscribe</button>
           </div>
        </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/70'>Copyright 2025  &copy; Adem Hoş, All Rights Reserved</p>
    </footer>
  )
}

export default Footer
