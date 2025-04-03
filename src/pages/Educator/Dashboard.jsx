import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/Student/Loading'

const Dashboard = () => {
  const {currency} = useContext(AppContext)
  const [dashboardData,setDashboardData] = useState(null)

  const fetchDasboardData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDasboardData()
  },[])
  return dashboardData ? (
    <div className='flex flex-col items-center justify-between gap-8 md:p-8 p-4 pb-0 md:pb-0 pt-8'>
     <div className='space-y-5'>
      <div className='flex flex-wrap items-center gap-5'>
        <div className='flex items-center gap-3 shadow-custom-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.patients_icon} alt="patients icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-base text-gray-500'>Total Enrollments</p>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-custom-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.appointments_icon} alt="appointments icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
            <p className='text-base text-gray-500'>Total Courses</p>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-custom-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.earning_icon} alt="earning icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{currency} {dashboardData.totalEarnings}</p>
            <p className='text-base text-gray-500'>Total Earnings</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className='pb-4 text-lg font-medium'>Latest Enrollments</h2>
        <div className='flex flex-col items-center max-w-4xl rounded-md overflow-hidden bg-white border border-gray-500/20'>
          <table className='table-fixed md:table-auto w-full overflow-hidden'>
           <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
             <tr>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>Student Name</th>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>Course Title</th>
             </tr>
           </thead>
           <tbody className='text-gray-500 text-sm'>
            {dashboardData.enrolledStudentsData.map((item,index) => (
              <tr key={index} className='border-b border-gray-500'>
                <td className='px-4 py-3 hidden sm:table-cell text-center'>{index + 1}</td>
                <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                <img src={item.student.imageUrl} alt="" className='w-9 h-9 rounded-full' />
                <span className='truncate'>{item.student.name}</span>
                </td>
                <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
              </tr>
            ))}
           </tbody>
          </table>
        </div>
      </div>
     </div>
    </div>
  ): <Loading/>
}

export default Dashboard
