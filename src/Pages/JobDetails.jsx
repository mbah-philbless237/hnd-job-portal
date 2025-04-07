import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Job details:", data);
        setJob(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details. Please try again later.");
        setIsLoading(false);
      });
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      title: 'Submit your application',
      input: 'url',
      inputLabel: 'Resume URL',
      inputPlaceholder: 'Enter the URL to your resume',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a URL!';
        }
      }
    });

    if (url) {
      Swal.fire({
        title: 'Application Submitted!',
        text: `Your application has been submitted with resume: ${url}`,
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    }
  };

  if (isLoading) {
    return (
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
        <p className="font-medium">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
        <p className="font-medium">Job not found</p>
      </div>
    );
  }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
      <PageHeader title="Job Details" path="Jobs" />
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{job.jobTitle}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{job.companyName}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Job Details</h3>
            <p className="text-gray-600">Location: {job.jobLocation}</p>
            <p className="text-gray-600">Employment Type: {job.employmentType}</p>
            <p className="text-gray-600">Experience Level: {job.experienceLevel}</p>
            <p className="text-gray-600">Salary: {job.minPrice} - {job.maxPrice} {job.salaryType}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{job.descriptions}</p>
        </div>

        <button 
          className='bg-blue px-8 py-2 text-white rounded hover:bg-blue-700 transition-colors'
          onClick={handleApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
