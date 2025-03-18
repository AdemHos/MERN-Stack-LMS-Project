import React from 'react'
import Hero from '../../components/Student/Hero'
import Conpanies from '../../components/Student/Conpanies'
import CoursesSection from '../../components/Student/CoursesSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Conpanies/>
      <CoursesSection/>
    </div>
  )
}

export default Home
