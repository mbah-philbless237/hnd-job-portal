import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("philblessmbah@gmail.com"); // Default email

// set current page
const[currentPage, setCurrentPage] =useState(1);
const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch(`http://localhost:3000/myJob/${userEmail}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched jobs data:", data); // Debug log
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError("Failed to connect to the server. Please make sure the server is running.");
        setIsLoading(false);
        // Set empty array to prevent errors when rendering
        setJobs([]);
      });
  }, [searchText, userEmail]);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem)


  // next btn & previous btn
  const nextPage =() =>{
    if(indexOfLastItem < jobs.length){
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () =>{
    if (currentPage > 1 ) {
      setCurrentPage(currentPage - 1)
    }
  }


  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle?.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    // console.log(filter)
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    console.log("Deleting job with ID:", id);
    fetch(`http://localhost:3000/job/${id}?email=${encodeURIComponent(userEmail)}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.message || 'Failed to delete job');
          });
        }
        return res.json();
      })
      .then(data => {
        if(data.acknowledged === true) {
          alert("Job Deleted Successfully!!!");
          // Refresh the job list after deletion
          
          window.location.reload();
        }
      })
      .catch(error => {
        console.error("Error deleting job:", error);
        alert(error.message || "Failed to delete job. Please try again.");
      });
  }
    
    
    console.log("Current jobs:", currentJobs); // Debug log
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">All My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:ouline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            {" "}
            search
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">Please make sure your server is running at http://localhost:3000</p>
        </div>
      )}

      {/*table */}
      <section className = "py-1 bg-blueGray-50">
        <div className = "w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className = "relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className = "rounded-t mb-0 px-4 py-3 border-0">
              <div className = "flex flex-wrap items-center">
                <div className = "relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className = "font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className = "relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job"><button
                    className = "bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Post A New Job
                  </button></Link>
                </div>
              </div>
            </div>

            <div className = "block w-full overflow-x-auto">
              <table className = "items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      TITLE 
                    </th>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      COMPANY NAME
                    </th>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      SALARY
                    </th>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      EDIT
                    </th>
                    <th className = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      DELETE
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex items-center justify-center h-20">
                          <p>loading....</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : currentJobs.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex items-center justify-center h-20">
                          <p>No jobs found. {error ? "Please start the server." : "Try posting a new job."}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {
                      currentJobs.map((job, index) => {
                        console.log("Rendering job:", job); // Debug log for each job
                        return (
                          <tr key={index}>
                            <th className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                              {index + 1}
                            </th>
                            <td className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {job.jobTitle || job.JobTitle || "No Title"}
                            </td>
                            <td className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {job.companyName || job.CompanyName || "No Company"}
                            </td>
                            <td className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              ${job.minPrice || job.MinPrice || 0} - ${job.maxPrice || job.MaxPrice || 0}
                            </td>
                            <td className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <button><Link to={`/edit-job/${job?._id}?email=${encodeURIComponent(userEmail)}`}>Edit</Link></button>
                            </td>
                            <td className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <button onClick={() => handleDelete(job._id)} className="bg-red-700 py-2 px-6 text-white rounded-sm">Delete</button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
       

            {/* pagination */}
            <div className="flex justify-center text-black space-x-8 mb-8">
              {
                currentPage > 1 && (
                  <button className="hover:underline" onClick={prevPage}>Previous</button>
                )
              }
              {
                indexOfLastItem < jobs.length && (
                  <button onClick={nextPage}className="hover:underline">Next</button>

                )
              }

            </div>

      </section>
    </div>
  );
};

export default MyJob;
