import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeduration from "humanize-duration";
 
export const AppContext = createContext();

export const AppContextProvider = (props) => {

const currency = import.meta.env.VITE_CURRENCY
const navigate = useNavigate()
const [allCourses,setAllCourses] = useState([])
const [isEducator,setIsEducator] = useState(true)
const [enrolledCourses,setEnrolledCourses] = useState([])

//Fetch All Courses

 const fetchAllCourses = async () => {
  setAllCourses(dummyCourses)
 }

 // Calculating to rating of course 
 const calculateRating = (course) => {
  if(course.courseRatings.length === 0) {
      return 0
  }
  let totalRating = 0
  course.courseRatings.forEach(rating => {
    totalRating += rating.rating
  })
  return totalRating / course.courseRatings.length
 }
  // Function to calculate Chapter Time
   const calculateChapterTime = (chapter) => {
     let time = 0
     chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
     return humanizeduration(time*60*1000,{units: ['h','m']})
 
   }
 
   // Function to calculate Course Duration
   const calculateCourseDuration = (course) => {
     let time = 0
     course.courseContent.map((chapter) =>chapter.chapterContent.map(
       (lecture) => time += lecture.lectureDuration
     ) )
     return humanizeduration(time*60*1000,{units: ['h','m']})
   }
 
   // Calculate to No of the Lectures in course
   const calculateNoOfLectures = (course) => {
    let totalLectures = 0 
    course.courseContent.forEach(chapter => {
     if (Array.isArray(chapter.chapterContent)) {
       totalLectures += chapter.chapterContent.length
     }
    });
    return totalLectures;
   }

   // Fetch users enrolled courses
   const fetchUserEnrolledCourses = async () => {
      setEnrolledCourses(dummyCourses)
   }

 useEffect(() => {
    fetchAllCourses()
    fetchUserEnrolledCourses()
 },[])



    const value = {
     currency,
     allCourses,
     navigate,
     calculateRating,
     isEducator,
     setIsEducator,
     calculateCourseDuration,
     calculateChapterTime,
     calculateNoOfLectures,
     enrolledCourses,
     fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
          {props.children}
        </AppContext.Provider>
    )
}