import React from "react";
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo1.jpeg";


const Navlinks = [
    {
        id: 1,
        title: "Home",
        link: "/#"
    },
     {
        id: 2,
        title: "Services",
        link: "/#Services"
    }, {
        id: 3,
        title: "Reviews",
        link: "/#Testimonial"
    },
    
]
const Navbar = () => {  
    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-gray/70 shadow-xl backdrop-blur-sm">
            <div className='container py-3 sm:py-0 '>
                {/* logo section */}
                <div className="flex justify-between items-center">
                    {/* links section */}
                    <div className="">
                        <a href="/#">
                            <img src={Logo} alt="Project 32 logo " className="w-16" />
                        </a>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <ul className="hidden sm:flex hover:red-400 items-center gap-4">
                            {Navlinks.map((link)=>(
                                <li key={link.id}><a className="py-4 px-4 hover:red-400 duration-300" href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-blue-500 to-red-600 text-white px-4 py-1 rounded-lg hover:scale-105 duration-300"
                        >
                            Sign Up/Login
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )};


export default Navbar;