import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../../context/AppContext'
import SearchBar from '../../components/Student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/Student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/Student/Footer'


const CoursesList = () => {
  const {navigate,allCourses} = useContext(AppContext)
  const {input} = useParams()
  const [filteredCourse,setFilteredCourse] = useState([])

  useEffect(() => {
    if(allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      input ? 
      setFilteredCourse(
        tempCourses.filter(
          item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      )
      : setFilteredCourse(tempCourses)
    } 

  },[allCourses,input])
  return (
    <>
      <div className='relative px-8 md:px-36 pt-20 text-left'>
        <div className='flex md:flex-row flex-col items-start justify-between gap-6 w-full'>
          <div>
          <h1 className='text-3xl font-semibold text-gray-700'>Course List</h1>
          <p className='text-gray-500'> <span onClick={() => navigate('/')} className='text-blue-500 cursor-pointer'>Home</span> / CourseList</p>
          </div>
          <SearchBar data={input}/>        
        </div>
         {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 mt-8 -mb-8 border text-gray-700'>
            <p>{input}</p>
            <img src={assets.cross_icon} alt="" onClick={() =>navigate('/course-list')} className='cursor-pointer' />

          </div>
         }
      
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 px-2 md:px-0 gap-4'>
          {filteredCourse.map((course,index) => <CourseCard key={index} course={course}/>)}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CoursesList
