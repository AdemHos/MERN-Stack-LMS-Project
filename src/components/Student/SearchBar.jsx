import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate()
  const [input,setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
   e.preventDefault()
   navigate('/course-list/' + input)
  }

  return (


     <form onSubmit={onSearchHandler} className='max-w-xl w-full shadow-lg bg-white h-12 md:h-14 flex items-center rounded'>
      <img src={assets.search_icon} alt="Search" className='md:w-auto w-10 px-3' />
      <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Search' className='w-full h-full text-gray-500/80 outline-none' />
      <button type='submit' className='bg-black text-white rounded-lg md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>

     </form>
    
  )
}

export default SearchBar
