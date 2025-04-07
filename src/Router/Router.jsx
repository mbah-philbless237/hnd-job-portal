import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import about from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJob from "../Pages/MyJob";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/updateJop";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import AdminDashboard from "../Pages/AdminDashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children:[
        {path:"/", element: <Home/>},
        {
          path: "/post-job",
          element:<CreateJob/>
        },
        {
          path: "/my-job",
          element:<MyJob/>
        },
        {
          path: "/salary",
          element:<SalaryPage/>
        },
        {
          path:"/edit-job/:id",
          element: <UpdateJob/>,
          loader:({params, request}) => {
            const url = new URL(request.url);
            const email = url.searchParams.get('email') || "philblessmbah@gmail.com";
            return fetch(`http://localhost:3000/all-jobs/${params.id}`)
              .then(res => {
                if (!res.ok) {
                  throw new Error(`Job not found: ${res.status}`);
                }
                return res.json();
              });
          }
        },
        {
          path:"/jobs/:id",
          element: <JobDetails/>
        },
        {
          path: "/admin",
          element: <AdminDashboard />
        }
      ],
    },
    {
      path: "/log-in",
      element:<Login/>
    },
    {
      path: "/sign-up",
      element:<Login/>
    }
  ]);

export default router;  