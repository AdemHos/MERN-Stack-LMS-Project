import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'

const AddCourse = () => {
  
  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle,setCourseTitle] = useState('')
  const [coursePrice,setCoursePrice] = useState(0)
  const [discount,setDiscount] = useState(0)
  const [image,setImage] = useState(null)
  const [chapters,setChapters] = useState([])
  const [showPopup,setShowPopup] = useState(false)
  const [currentChapterId,setCurrentChapterId] = useState(0)
  const [lectureDetails,setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    } 

  )

 const handleChapter = (action,chapterId) => {
  if (action === 'add') {
    const title = prompt('Enter a Chapter Name')
    if(title) {
      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent:[],
        collapsed: false,
        chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1: 1
      };
      setChapters([...chapters,newChapter])
    }
  }else if(action === 'remove') {
    setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
  }else if (action === 'toggle') {
    setChapters(
      chapters.map((chapter) => chapter.chapterId === chapterId ? {...chapter,collapsed: !chapter.collapsed}: chapter )
    )
  }
 }

 const handleLecture = (action,chapterId,lectureIndex) => {
  if(action === 'add') {
    setCurrentChapterId(chapterId)
    setShowPopup(true)
  }else if(action === 'remove') {
    setChapters(
      chapters.map((chapter) => {
        if(chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureIndex,1)
        }
        return chapter;
      })
    )
  }
 }

 const addLecture = () => {
  setChapters(
    chapters.map((chapter) => {
      if(chapter.chapterId === currentChapterId) {
        const newLecture = {
          ...lectureDetails,
          lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0]
          .lectureOrder + 1: 1,
          lectureId: uniqid(),
        };
        chapter.chapterContent.push(newLecture)
      }
      return chapter;
    })
  )
  setShowPopup(false)
  setLectureDetails(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    }
  )
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
 }

  useEffect(() => {
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }
  },[])

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between p-4 md:p-8
    md:pb-0 pb-0 pt-8'>
      <form onSubmit={handleSubmit} >
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='Type Here!' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />

        </div>
        <div className='flex flex-col gap-1'>
           <p>Course Description</p>
           <div ref={editorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap gap-4'>
           <div className='flex flex-col gap-1'>
             <p>Course Price</p>
             <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />

           </div>



           <div className='flex md:flex-row  flex-col gap-3 items-center'>
           <p>Course Thumbnail</p>
           <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
            <img src={assets.file_upload_icon} alt="File Upload" className='p-3 cursor-pointer bg-blue-500 rounded' />
            <input type="file"  id="thumbnailImage" onChange={e => setImage(e.target.files[0])} accept='image/*'
            hidden />
            <img src={image ? URL.createObjectURL(image) : ''} alt="" className='max-h-10' />
           </label>
        </div>
        </div>

        <div className='flex flex-col gap-1'>
           <p>Discount %</p>
           <input type="number" onChange={e => setDiscount(e.target.value)} value={discount}
           placeholder='0' min={0} max={100} required
           className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' />
        </div>
        {/* Adding Chapters and Lectures */}
        <div>
          {chapters.map((chapter,chapterIndex) => (
            <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
              <div className='flex items-center justify-between p-4 border-b'>
                 <div className='flex items-center'>
                   <img onClick={() =>handleChapter('toggle',chapter.chapterId)} src={assets.dropdown_icon} alt="" width={14}
                   className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"} `} />
                   <span className='font-semibold'>
                    {chapterIndex + 1} {chapter.chapterTitle}
                   </span>
                 </div>
                 <span className='text-gray-500'>
                  {chapter.chapterContent.length} Lectures
                 </span>
                 <img onClick={() =>handleChapter('remove',chapter.chapterId)} src={assets.cross_icon} alt="" className='cursor-pointer' />
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture,lectureIndex) => (
                    <div key={lectureIndex} className='flex items-center justify-between mb-2' >
                      <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins -
                        <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a> -
                        {lecture.isPreviewFree ? 'Free Prewiev' : 'Paid'} '
                      </span>
                      <img onClick={() =>handleLecture('remove',chapter.chapterId,lectureIndex)} src={assets.cross_icon} alt="" className="cursor-pointer" />
                    </div>
                  ))}
                  <div onClick={() => handleLecture('add',chapter.chapterId)} className='inline-flex bg-gray-100 rounded cursor-pointer p-2 mt-2'> 
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div onClick={() => handleChapter('add')} className='flex justify-center items-center bg-blue-500 text-white p-2 rounded-lg my-4 cursor-pointer'>
            + Add Chapter
          </div>
          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div className='bg-white text-gray-700 relative p-4 rounded w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
                <div className='mb-2'>
                <p>Lecture Title</p> 
                <input type="text"
                className='mt-1 border rounded w-full block px-2 py-1 '
                value={lectureDetails.lectureTitle}
                onChange={(e) => setLectureDetails({...lectureDetails,lectureTitle: e.target.value})} />  
                </div>  
                <div className='mb-2'>
                <p>Duration (minutes)</p> 
                <input type="number"
                className='mt-1 border rounded w-full block px-2 py-1 '
                value={lectureDetails.lectureDuration}
                onChange={(e) => setLectureDetails({...lectureDetails,lectureDuration: e.target.value})} />  
                </div> 

                <div className='mb-2'>
                <p>Lecture Url</p> 
                <input type="text"
                className='mt-1 border rounded w-full block px-2 py-1 '
                value={lectureDetails.lectureUrl}
                onChange={(e) => setLectureDetails({...lectureDetails,lectureUrl: e.target.value})} />  
                </div>  
                <div className='mb-2'>
                <p>Is Preview Free ?</p> 
                <input type="checkbox"
                className='mt-1 border rounded w-full block px-2 py-1 '
                value={lectureDetails.isPreviewFree}
                onChange={(e) => setLectureDetails({...lectureDetails,isPreviewFree: e.target.checked})} />  
                </div> 
                <button onClick={addLecture} type='button' className='w-full bg-blue-500 text-white rounded px-4 py-2'>Add</button>
                <img src={assets.cross_icon} onClick={() => setShowPopup(false)} alt=""
                className='w-4 absolute top-4 right-4 cursor-pointer' />
              </div>
            </div>
          )}
        </div>
        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 my-4 rounded'>ADD</button>
        
      </form>
    </div>
  )
}

export default AddCourse
