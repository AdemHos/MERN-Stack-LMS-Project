import React, { use, useContext } from 'react'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {

  const isCourseListPage = location.pathname.includes('/course-list')
  const {openSignIn} = useClerk()
  const {user} = useUser()
  const {navigate} = useContext(AppContext)

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 shadow-md py-4 
    
     ${isCourseListPage ? 'bg-white' : 'bg-blue-50'} `}>
      <img src={assets.logo} alt="Logo" onClick={() => navigate('/')} className='w-28 lg:w-32 cursor-pointer' />

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
         <div className='flex items-center gap-5'>
          { user && <>
          
            
            <button>Become Educator</button>
          | <Link to={'/my-enrollments'}>My Enrollments</Link></>
          }
         </div>
         { user ? <UserButton/> :
          
          <button onClick={() =>openSignIn()} className='bg-black text-white px-5 py-2 rounded-full'>Create Account</button>}
      </div>
      {/* For Mobile Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
      <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
      { user && <>
        <button>Become Educator</button>
      | <Link to={'/my-enrollments'}>My Enrollments</Link> </>}
      </div>
      {user ? <UserButton/> : 
      <button onClick={() => openSignIn()}>
        <img src={assets.user_icon} alt="" />
      </button>
      }
      </div>
    </div>
  )
}

export default Navbar
