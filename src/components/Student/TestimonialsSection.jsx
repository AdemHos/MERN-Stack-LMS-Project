import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
     <h2 className='font-semibold text-gray-800 mt-8 text-3xl'>Testimonials</h2>
     <p className='mt-3 md:text-base text-gray-500'>Look at here, if you instresting What our clients say</p>
     <div className='grid grid-cols-auto gap-8 mt-14'>
      {dummyTestimonial.map((testimonial,index) => (
        <div key={index} className='text-sm text-left border border-gray-500/30 bg-white pb-6 rounded-lg shadow-md'>
          <div className='flex items-center gap-4 px-4 '>
            <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
            <div>
              <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
              <p className='text-gray-700'>{testimonial.role}</p>
            </div>
            
          </div>
          <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_ , i) => (
                              <img className='h-5' src={i < Math.floor(testimonial.rating) ? assets.star :assets.star_blank } key={i} alt=''/>
                            ))}
              </div>
              <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
            </div>
            <a href="#" className='text-blue-500 px-5' >Read More</a>
        </div>
      ))}
     </div>
    </div>
  )
}

export default TestimonialsSection
