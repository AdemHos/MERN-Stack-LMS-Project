import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/Student/Loading'

const StudentsEnrolled = () => {
  const [enrolledStudents,setEnrolledStudents] = useState(null)
  const fetchStudentsEnrolled = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchStudentsEnrolled()
  },[])

  return enrolledStudents ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0 md:pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 font-medium text-lg'>My Courses</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white borer border-gray-500/20'>
          <table className='md:table-auto table-fixed overflow-hidden w-full'>
            <thead className='text-gray-900 text-left border-b border-gray-500/20 text-sm'>
              <tr>
                <th className='px-4 py-3 truncate font-semibold'>#</th>
                <th className='px-4 py-3 truncate font-semibold'>Student Name</th>
                <th className='px-4 py-3 truncate font-semibold'>Course Title</th>
                <th className='px-4 py-3 truncate font-semibold'>Date</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((item,index) => (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='px-4 py-3 hidden sm:table-cell text-center'>
                    {index + 1}
                  </td>
                 <td className='px-2 md:px-4 py-3 flex items-center space-x-3'>
                   <img src={item.student.imageUrl} alt="Student İmage" className='w-9 h-9 rounded-full' />
                   <span className='trumcate'>{item.student.name}</span>
                 </td>
                 <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                 <td className='px-4 py-3 hidden sm:table-cell'>
                  {new Date(item.purchaseDate).toLocaleDateString() }
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default StudentsEnrolled
