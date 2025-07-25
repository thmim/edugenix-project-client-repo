
import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import TeacherRequest from "../pages/teacherRequest/TeacherRequest";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";

import PendingTeacher from "../pages/dashboardPages/pendingApplication/PendingTeacher";
import AddClass from "../pages/dashboardPages/addclass/AddClass";
import MyClasses from "../pages/dashboardPages/Myclasses/MyClasses";
import UpdateAddClass from "../pages/dashboardPages/Myclasses/UpdateAddClass";
import AllClasses from "../pages/dashboardPages/allclass/AllClasses";
import MakeAdmin from "../pages/dashboardPages/makeadmin/MakeAdmin";
import AllPaidClasses from "../pages/teacherRequest/AllPaidClasses";
import PaidClassDetails from "../pages/teacherRequest/PaidClassDetails";
import Payment from "../pages/dashboardPages/payment/Payment";
import MyEnrollClass from "../pages/dashboardPages/Enrollclass/MyEnrollClass";
import SeeDetails from "../pages/dashboardPages/seeDetailsPage/SeeDetails";
import AllAssignment from "../pages/dashboardPages/Allassignment/AllAssignment";
import Profile from "../pages/dashboardPages/userProfile/Profile";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import DashBoardHome from "../pages/dashboardPages/dashboardHome/DashBoardHome";
import Loading from "../pages/shared/loading/Loading";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index:true, Component:Home
        },
        {
          path:"teacherApply",
          element:<PrivateRoute><TeacherRequest></TeacherRequest></PrivateRoute>
        },
        {
          path:"allPaidClasses",
          loader:()=>fetch('https://my-edugenix-project-server-site.vercel.app/allApproveClassCount'),
          Component:AllPaidClasses,
          hydrateFallbackElement:<Loading></Loading>
        },
        {
          path:"enroll/:id",
          element:<PrivateRoute><PaidClassDetails></PaidClassDetails></PrivateRoute>
        },
        {
          path:"forbidden",
          Component:Forbidden
        }
    ]
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      },
      {
        path:"payments/:courseId",
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {
        index:true, Component:DashBoardHome
      },
      {
        path:"teacher-requests",
        loader:()=>fetch('https://my-edugenix-project-server-site.vercel.app/allTeachersCount'),
        element:<AdminRoute><PendingTeacher></PendingTeacher></AdminRoute>,
        hydrateFallbackElement:<Loading></Loading>
      },
      {
        path:"addClass",
        Component:AddClass
      },
      {
        path:"my-class",
        Component:MyClasses
      },
      {
        path:"seeDetails/:id",
        Component:SeeDetails
      },
      {
        path:"assignments/:courseId",
        Component:AllAssignment
      },
      {
        path:"updateAddClass/:id",
        
        Component:UpdateAddClass,
        hydrateFallbackElement:<Loading></Loading>
      },
      {
        path:"all-classes",
        element:<AdminRoute><AllClasses></AllClasses></AdminRoute>,
        loader:()=>fetch('https://my-edugenix-project-server-site.vercel.app/totalClassCount'),
        hydrateFallbackElement:<Loading></Loading>
      },
      
      {
        path:"users",
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path:"my-enroll-class",
        Component:MyEnrollClass
      },
      {
        path:"profile",
        Component:Profile
      }
    ]
  }
]);
