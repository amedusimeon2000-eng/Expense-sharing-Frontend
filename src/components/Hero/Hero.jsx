import React from 'react'
import { Link } from 'react-router-dom'
import HeroImg from '../../assets/HeroImg.jpg'

const bgImage = {
  backgroundImage: `url(${HeroImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: '650px',
  height: 'calc(100vh - 75px)',
  marginTop: '0',
}
const dShadow = {
    filter:'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.5))'
}

export const Hero = () => {
  return (
    <div style={bgImage} className='w-full min-h-[650px] bg-gray-100' data-aos='fade-in'>
        <div className='min-h-[650px] h-full backdrop-blur-sm font-bold flex flex-col justify-center items-center'>
            <div className='my-10  mx-3' data-aos='fade-up' data-aos-delay='100'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl text-gray-200'>
            Friends who share <span className='text-green-500 ' style={dShadow}>Finance</span> , Grow <span className='text-green-500 ' style={dShadow}>Finance</span>
            </h1>
            <p className='md:text-2xl sm:text-1xl text-sm text-gray-200'>share bills easier with your Friend, Partner, or Group</p>

            </div>
            
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-red-600 font-bold text-white px-4 py-1 rounded-full border-1 border-[rgba(255, 255, 255, 0.5)] hover:scale-105 md:text-2xl duration-300 justify-center items-center"
              data-aos='zoom-in'
              data-aos-delay='200'
            >
                Start Here
            </Link>
      </div>
    </div>
  )
}

export default Hero
