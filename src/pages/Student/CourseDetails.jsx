import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/Student/Loading'
import { assets } from '../../assets/assets'
import humanizeduration from 'humanize-duration'
import Footer from '../../components/Student/Footer'
import YouTube from 'react-youtube'


const CourseDetails = () => {
  const {id} = useParams()
  const [courseData,setCourseData] = useState(null)
  const [isAlreadyEnrolled,setIsAlreadyEnrolled] = useState(false)
  const [openSections,setOpenSections] = useState({})
  const [playerData,setPlayerData] = useState(null)


  const {allCourses,calculateRating,calculateNoOfLectures,calculateChapterTime,calculateCourseDuration,currency} = useContext(AppContext)
  const fetchCourseData = async  () => {
   const findCourse = allCourses.find(course => course._id === id)
   setCourseData(findCourse)
  } 

 

  useEffect(() => {
  fetchCourseData()
  },[])

 const toggleSection = (index) => {
   setOpenSections((prev) => (
     {
      ...prev,
      [index]: !prev[index],
     }
   ))
 }

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between
    md:px-36 px-8 md:pt-30 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'>

      </div>
      {/* Left Column */}
      <div className='max-w-xl text-gray-500 z-10'>
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small
        font-semibold text-gray-800'>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm'
        dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
        {/* Rewiev and Ratings */}
        <div className='flex items-center space-x-2'>
                  <p>{calculateRating(courseData)}</p>
                  <div className='flex'>
                    {[...Array(5)].map((_ , i) => (
                      <img className='w-3 h-3' src={i < Math.floor(calculateRating(courseData)) ? assets.star :assets.star_blank } key={i} alt=''/>
                    ))}
                  </div>
                  <p className='text-blue-500'>({courseData.courseRatings.length} {courseData.courseRatings
                    .length > 1 ? 'ratings' : 'rating'}) </p>
                    <p className='text-blue-500'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length
                     > 1 ? 'Students' : 'Student' }</p>
                </div>
                <p className='text-sm'>Course by : <span className='text-blue-700'>Adem Hos</span></p>
                
                <div className='pt-0 text-gray-800'>
                  <h2 className='text-xl font-semibold'>Course Structure</h2>
                  <div className='pt-5'>
                    {courseData.courseContent.map((chapter,index) => (
                      <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                        <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                          <div onClick={() => toggleSection(index)} className='flex items-center gap-2'>
                            <img className={`transform transition-transform 
                              ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="" />
                            <p className='md:text-base text-sm font-medium'>{chapter.chapterTitle}</p>
                          </div>
                          <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ${openSections[index]
                        ? 'max-h-96': 'max-h-0'} `}>
                          <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-700 
                          border-t border-gray-300'>
                            {chapter.chapterContent.map((lecture,i) => (
                              <li key={i} className='flex items-start gap-2 py-1'>
                                <img src={assets.play_icon} alt="play_icon" className='w-4 h-4 mt-1' />
                                <div className='flex items-center justify-between w-full text-gray-800
                                text-xs md:text-default'>
                                  <p>{lecture.lectureTitle}</p>
                                  <div className='flex gap-2'>
                                    {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                      videoId: lecture.lectureUrl.split('/').pop()
                                    })} className='text-blue-500 cursor-pointer'>Preview</p>}
                                    <p>{humanizeduration(lecture.lectureDuration * 60 * 1000,
                                      {units: ['h','m']}
                                    )}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='py-20 text-sm md:text-default'>
                 <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
                 <p className='pt-3 rich-text'
        dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></p>
                </div>
        
              </div>
      {/* Right Column */}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none
      overflow-hidden bg-white min-w[300px] sm:min-w-[420px]'>
        {
          playerData ?
          <YouTube videoId={playerData.videoId} options={{playerVars: {
            autoPlay: 1
          }}} iframeClassName='w-full aspect-video'/>
          :  <img src={courseData.courseThumbnail} alt="" />
        }
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" />
            <p className='text-red-500'> <span className='font-medium'> 5 days</span> left at this price!!</p>
          </div>
          <div className='flex items-center gap-3 pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice/100).toFixed(2)}</p>
            <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice}</p>
            <p className='md:text-lg text-green-600'>{courseData.discount}% off</p>
          </div>
            {/* Details */}
          <div className='flex items-center gap-4 pt-2 md:pt-4 text-gray-500 text-sm md:text-default'>
              <div className='flex items-center gap-1'>
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} alt="time clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} alt="lesson icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
              
          </div>
          <button className='md:mt-6 mt-4 bg-black text-white w-full py-3 rounded-md font-medium'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800 '>What's in the course</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>Lifetime Access with Free Updates</li>
              <li>Project base guidance</li>
              <li>Downloadable resources and source code</li>
              <li>Exams for test your knowledge</li>
              <li>Complation Certificate</li>

            </ul>
          </div>


        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  ): <Loading/>
}

export default CourseDetails
