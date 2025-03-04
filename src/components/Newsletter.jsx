import React from 'react'
import {FaEnvelopeOpenText, } from "react-icons/fa6";
const Newsletter = () => {
  return (
    <div>
     <div>

        <h3 className="text-lg font-bold mb-2 flex item-center gap-2">
            <FaEnvelopeOpenText/>
            Email me for Jobs</h3>

            <p className="text-primary/75 text-base mb-4">check if u have a new email</p>

       <div className="w-full space-y-4">
          <input type="email" none="email" id="email" placeholder="name@mail.com"className="w-full block 
          py-2 pl-3 border focus:outline-none"/>
          <input type="submit" value={"subscribe"} className="w-full block py-2 pl-3 border focus:outline-none 
          bg-blue rounded-sm  text-white cursor-pointer font semi-bold"/>
        </div>


        
        </div>
   
         {/* 2nd part */}
            <div className="mt-20">
            
             <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <FaEnvelopeOpenText/>
               Get noticed faster
              </h3>

             <p className="text-primary/75 text-base mb-4">check if u have a new email</p>

             <div className="w-full space-y-4">
            <input type="submit" value={"Upload your resume"} className="w-full block py-2 pl-3 border focus:outline-none 
            bg-blue rounded-sm  text-white cursor-pointer font-semibold"/>
            </div>



       </div>
    
    </div>


  );
};

export default Newsletter;
