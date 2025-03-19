import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn everything at everywhere</h1>
      <p className='text-500 sm:text-sm'>You can reach our courses where you want <br/> 
      Learn everything in your confort place 
      Don't listen talking about leave your confort place.
       </p>
       <div className='flex items-center font-medium gap-6 mt-4' >
        <button className='px-8 py-3 bg-black text-white rounded-md'>Get Started</button>
        <button className='px-8 py-3 rounded-md bg-white text-black border border-black flex gap-2'>Learn More <img src={assets.arrow_icon} alt="arrow_icon" /></button>
       </div>
    </div>
  )
}

export default CallToAction
