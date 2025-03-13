import React from 'react'
import { assets } from '../../assets/assets'

const Conpanies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Companies that colaborate with us</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        <img src={assets.paypal_logo} alt="Paypal" className='w-20 md:w-28'/>
        <img src={assets.accenture_logo} alt="Accenture" className='w-20 md:w-28'/>
        <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28'/>
        <img src={assets.adobe_logo} alt="Addobe" className='w-20 md:w-28'/>
        <img src={assets.walmart_logo} alt="Walmart" className='w-20 md:w-28'/>
      </div>
    </div>
  )
}

export default Conpanies
