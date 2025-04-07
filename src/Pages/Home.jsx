import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/sidebar";
import Newsletter from "../components/Newsletter"

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched jobs:", data);
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
  }, []);

  // Handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle?.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Handle radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle button-based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index range
   const calculatePageRange = () =>{
       const startindex = (currentPage - 1)*itemsPerPage;
       const endindex = startindex + itemsPerPage;
       return {startindex, endindex};
   }

   // function for the next page
   const nextPage =()=> {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
      setCurrentPage(currentPage + 1)
    }
   }

    // function for previous page
    const prevPage =() => {
      if(currentPage > 1){
        setCurrentPage(currentPage - 1) 
      }

    }

  // Main filtering function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = [...jobs];

    // Filter by query (job title)
    if (query) {
      filteredJobs = filteredItems;
    }

    // Filter by selected category
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType,postingDate }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase()||
          employmentType.toLowerCase() === selected.toLowerCase() 
      );
    }


    // slice the data based on current page
    const{startindex, endindex} = calculatePageRange();
    filteredJobs = filteredJobs.slice(startindex, endindex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);

  };


  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {error && (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <p className="mt-2">Please make sure your server is running at http://localhost:3000</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* Left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading....</p>
          ) : error ? (
            <p className="font-medium text-red-500">Server connection error. Please start the server.</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} jobs</h3>
              <p>No data found!</p>
            </>
          )}

          {/*pegination here */}
{
  result.length > 0 ? (
    <div className="flex justify-center mt-4 space-x-8">
     <button onClick={prevPage} disabled={currentPage === 1}
     className="hover:underline">Previous</button>
     <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
     <button onClick={nextPage} disabled = {currentPage === Math.ceil(filteredItems.length / 
      itemsPerPage)} className="hover:underline">Next</button>
    </div>
  ):""
}

        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>
    </div>
  );
};

export default Home;