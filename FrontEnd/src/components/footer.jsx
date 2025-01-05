import React from 'react'
import logoImg from "../assets/logix_logo.png";
import { TeamSection } from './TeamSection';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate= useNavigate();
  return (
<div class="w-full flex items-center justify-center bg-black">
        <div class="md:w-[90%] w-full px-4 text-white flex flex-col">
            <div class="w-full text-7xl font-bold pt-10">
                <h1 class="w-full md:w-[90%] pt-10">
                <span className='capitalize text-slate-300'>User Analytics </span></h1>
            </div>
            <div class="flex mt-8 flex-col md:flex-row md:justify-between">
                <p class="w-full md:w-2/4 text-gray-400">Platform for social media account Analytics, Engagement, and Insights.
                <br /> <br />
                Get in touch to find out more about digital experiences to effectively reach and engage customers and target audiences</p>
                <div class="w-44 pt-6 md:pt-0 ">
                <button onClick={() => { navigate("/userinput")}} 
                    className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                    <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                    <span className=" uppercase relative z-20"> Try it Out</span>
                </button>
                </div>
            </div>
            <div className='w-full mt-8'>
              <h1 className='text-[20px]'>Meet Our Team</h1>
              <div className="flex mt-12">
      <TeamSection items={people} />
    </div>
            </div>
            <div class="flex flex-col">
                <div class="flex mt-12 mb-6 px-[15px] md:px-1 flex-row items-center justify-between">
                    <div class="">
                    <div className="logo w-[65px] h-[65px] rounded-full overflow-hidden">
              <img
                src={logoImg}
                alt="logo"
                className="w-full h-full object-cover filter invert contrast-200"
              />
            </div>
                    </div>
                    <a href="/" class="hidden md:block cursor-pointer text-gray-400 hover:text-[#F97315] uppercase">Home</a>
                    <a href="/userinput" class="hidden md:block cursor-pointer text-gray-400 hover:text-[#F97315] uppercase">Try it out!</a>
                    <a href='https://github.com/in/ayushflows' class="hidden md:block cursor-pointer text-gray-400 hover:text-[#F97315] uppercase">Github</a>
                    <a href="https://www.linkedin.com/in/ayushflows" class="hidden md:block cursor-pointer text-gray-400 hover:text-[#F97315] uppercase">Contact</a>
                    <div class="flex flex-row space-x-8 items-center justify-between">
                        <a href="https://www.linkedin.com/in/ayushflows/">
                        <svg className='hover:scale-110 duration-100 ease-in-out' xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                        </svg>
                       
                        </a>
                        <a href="https://www.instagram.com/ayushflows/">
                        <svg className='hover:scale-110 duration-100 ease-in-out' xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                        </svg>  
                        </a>
                        <a href="https://github.com/in/ayushflows">
                        <svg className='hover:scale-110 duration-100 ease-in-out' xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                        </svg>                         
                        </a>
                    </div>
                </div>
                <hr class="border-gray-600"/>
                <p class="w-full text-center my-6 text-gray-600">Copyright © 2024 Team LogiX</p>
            </div>
        </div>
    </div>
  )
}

export default Footer


    
const people = [
  {
    id: 1,
    name: "Ayush Tripathi",
    designation: "Team Leader & FullStack Developer",
    image:
    "https://avatars.githubusercontent.com/u/124663413?s=400&u=76f022cb34ee30b47d3b7bc4c911e6f40ee4b731&v=4",
  },
  {
    id: 2,
    name: "Nitesh Saini",
    designation: "Backend & AI Developer",
    image:
    "https://avatars.githubusercontent.com/u/139841989?v=4",
  },
  {
    id: 3,
    name: "Bhagwat Karhale",
    designation: "AI Developer",
    image:
    "https://avatars.githubusercontent.com/u/145754489?v=4",
  },
  {
    id: 4,
    name: "Rishabh Kumar",
    designation: "Data Scientist",
    image:
    "https://avatars.githubusercontent.com/u/142030870?v=4",
  },
];