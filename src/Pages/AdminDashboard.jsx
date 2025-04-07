import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalCompanies: 0,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3000/all-jobs");
      const data = await response.json();
      setJobs(data);
      
      // Calculate statistics
      const uniqueCompanies = new Set(data.map(job => job.companyName || job.CompanyName));
      setStats({
        totalJobs: data.length,
        activeJobs: data.filter(job => new Date(job.postingDate || job.PostingDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
        totalCompanies: uniqueCompanies.size,
      });
      
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`http://localhost:3000/job/${id}?email=admin@example.com`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setJobs(jobs.filter(job => job._id !== id));
          alert("Job deleted successfully!");
        } else {
          throw new Error("Failed to delete job");
        }
      } catch (err) {
        alert("Failed to delete job. Please try again later.");
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Companies</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalCompanies}</p>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.jobTitle || job.JobTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.companyName || job.CompanyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.postedBy || job.postedBY}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(job.postingDate || job.PostingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:text-blue-800">
                        <FiEye className="w-5 h-5" />
                      </Link>
                      <Link to={`/edit-job/${job._id}?email=admin@example.com`} className="text-green-600 hover:text-green-800">
                        <FiEdit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 