import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../Student/CourseCard'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div>
      <h2 className='text-gray-800 font-medium text-3xl'>Best Tutors are here</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Explore online world,improve yourself,gain new skillsets and take to your career next level</p>

      <div className='grid grid-cols-auto gap-4 px-4 md:px-0 my-10 md:my-16'>
        {allCourses.slice(0,4).map((course,index) => <CourseCard key={index} course={course}/> ) }
      </div>
      
      <Link to={'/course-list'} onClick={() => scrollTo(0,0)} className=
      'text-gray-500 border border-gray-500 px-10 py-3 rounded-lg hover:bg-black hover:text-white transition duration-300'>
      Show all Courses
      </Link>
    </div>
  )
}

export default CoursesSection
