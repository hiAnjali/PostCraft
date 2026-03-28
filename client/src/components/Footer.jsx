import React from 'react'
import { footer_data } from '../assets/assets'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-violet-400'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white text-gray-700 font-semibold'>
        <div>
          <img src={logo} alt="" className='w-8 sm:w-18'/>
          <p className='max-w-[410px] mt-6'>
            PostCraft blends creativity with clarity - turning ordinary words into powerful experiences.
            Whether you&apos;re writing to inspire, inform, or ignite action, our tools help your message land with meaning.
            Because every phrase deserves to be felt.
          </p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index)=> (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-800 md:mb-5 mb-2'>{section.title}</h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i)=> (
                  <li key={i}>
                    <a href="#" className='hover:underline transition'>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base font-semibold text-white'>© 2025 PostCraft - Crafted with care. All rights reserved.</p>
    </div>
  )
}

export default Footer
