import React from "react";
import { FiCalendar,FiClock,FiDollarSign,FiMapPin } from "react-icons/fi"
import {Link} from 'react-router-dom'

const Card = ({ data }) => {
  const {
    _id, 
    companyName, 
    CompanyName,
    jobTitle, 
    JobTitle,
    companyLogo,
    minPrice,
    MinPrice,
    maxPrice,
    MaxPrice,
    salaryType,
    SalaryType,
    jobLocation,
    JobLocation,
    employmentType,
    EmploymentType,
    postingDate,
    PostingDate,
    description,
    Description
  } = data;
  
  // Use either lowercase or uppercase version of the fields
  const displayCompanyName = companyName || CompanyName || "Company Name Not Available";
  const displayJobTitle = jobTitle || JobTitle || "Job Title Not Available";
  const displayMinPrice = minPrice || MinPrice || "0";
  const displayMaxPrice = maxPrice || MaxPrice || "0";
  const displaySalaryType = salaryType || SalaryType || "Not specified";
  const displayJobLocation = jobLocation || JobLocation || "Location not specified";
  const displayEmploymentType = employmentType || EmploymentType || "Type not specified";
  const displayPostingDate = postingDate || PostingDate || "Date not specified";
  const displayDescription = description || Description || "No description available";
  
  return (
    <div>
      <section className="card">
         <Link to={`/jobs/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
    <img src = {companyLogo} alt="" />
    <div >
          <h4 className="text-primary mb-1">{displayCompanyName}</h4>
        < h3 className="text-lg font-semibold mb-2">{displayJobTitle}</h3>
           
            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
             <span className="flex items-center gap-2 "><FiMapPin/>{displayJobLocation}</span>
             <span className="flex items-center gap-2 "><FiClock/>{displayEmploymentType}</span>
             <span className="flex items-center gap-2 "><FiDollarSign/>{displayMinPrice}-{displayMaxPrice}</span>
             <span className="flex items-center gap-2 "><FiCalendar/>{displayPostingDate}</span>
            </div>
            <p className="text-base text-primary/70">{displayDescription}</p>
    </div>
         </Link>
      </section>
    </div>
  )
}

export default Card;
