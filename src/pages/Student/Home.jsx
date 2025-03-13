import React from 'react'
import Hero from '../../components/Student/Hero'
import Conpanies from '../../components/Student/Conpanies'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Conpanies/>
    </div>
  )
}

export default Home
