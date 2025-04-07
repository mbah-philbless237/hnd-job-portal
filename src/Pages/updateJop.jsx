import React from 'react'
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const UpdateJob = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const jobId = params.id;
  const userEmail = searchParams.get('email') || "philblessmbah@gmail.com";
  
  console.log("Job ID for update:", jobId);
  console.log("User email for authorization:", userEmail);
  
  const jobData = useLoaderData();
  console.log("Job data loaded:", jobData);

  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    console.log("Updating job with data:", data);
    
    fetch(`http://localhost:3000/update-job/${jobId}?email=${encodeURIComponent(userEmail)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.message || 'Failed to update job');
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("Update result:", result);
        if(result.acknowledged === true) {
          alert("Job Updated Successfully!!!");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        alert(error.message || "Failed to update job. Please try again.");
      });
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/*form*/}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*1st row*/}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job Title</label>
              <input
                type="text"
                defaultValue={jobData.jobTitle}
                {...register("JobTitle")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full  ">
              <label className="block mb-2 text-lg "> Company Name </label>
              <input
                type="text"
                defaultValue={jobData.companyName}
                placeholder="Ex: Microsoft"
                {...register("CompanyName")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/*2nd row*/}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Minimum Salary</label>
              <input
                type="text"
                defaultValue={jobData.minPrice}
                placeholder="500000fcfa"
                {...register("minPrice")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full  ">
              <label className="block mb-2 text-lg"> Maximum Salary </label>
              <input
                type="text"
                defaultValue={jobData.maxPrice}
                placeholder="10000000fcfa"
                {...register("maxPrice")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/*3rd row**/}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                defaultValue={jobData.salaryType}
                {...register("salaryType")}
                className=" block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full  ">
              <label className="block mb-2 text-lg"> Job Location </label>
              <input
                type="text"
                defaultValue={jobData.jobLocation}
                placeholder="Ex: Yaounde"
                {...register("jobLocation")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/*4th row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full  ">
              <label className="block mb-2 text-lg"> Job Posting Date </label>
              <input
                type="date"
                defaultValue={jobData.postingDate}
                placeholder="Ex: 2025-02-22"
                {...register("postingDate")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                defaultValue={jobData.experienceLevel}
                {...register("experienceLevel")}
                className=" block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Experience</option>
                <option value="No experience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/*5th row */}
          <div>
            <label className="block mb-2 text-lg"> Required skill sets: </label>
            <CreatableSelect
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          {/*6th row */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full  ">
              <label className="block mb-2 text-lg"> Company Logo </label>
              <input
                type="url"
                defaultValue={jobData.companyLogo}
                placeholder="Paste your company logo url ULR: https://weshare.com/img1/"
                {...register("companyLogo")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                defaultValue={jobData.employmentType}
                {...register("employmentType")}
                className=" block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Select your job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporaly">Temporaly</option>
              </select>
            </div>
          </div>

          {/*7th row */}
          <div className="w-full">
          <label className="block mb-2 text-lg"> Job Description </label>
          <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
          rows={6}
          defaultValue={jobData.descriptions}
          placeholder="Job description"
          {...register("descriptions")}/>
          </div>

           {/*8th row */}
           <div className="w-full">
           <label className="block mb-2 text-lg"> Job Posted By </label>
           <input
                type="email"
                defaultValue={jobData.postedBy}
                placeholder="your email"
                {...register("postedBy")}
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />

           </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}

export default UpdateJob

