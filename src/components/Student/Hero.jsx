import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center md:pt-36 pt-20 px-7 md:px-0 w-full space-y-7 text-center'> 
      <h1 className='md:text-home-heading-large text-home-heading-small font-bold max-w-3xl mx-auto '><span className='text-blue-500'>Invest in yourself</span> with every course you choose</h1>
      <p className='md:block hidden max-w-2xl text-gray-600 mx-auto'>
      We provide you with world-class courses with valuable instructors.
      </p>
      <p className='md:hidden max-w-sm text-gray-600 mx-auto'>
      Make a decision now and make a great investment in your future, and at a very low cost.
      </p>
    </div>
  )
}

export default Hero
