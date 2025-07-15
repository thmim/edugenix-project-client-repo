
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
      }
    ]
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {
        path:"teacher-requests",
        Component:PendingTeacher
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
        path:"updateAddClass/:id",
        loader:({params})=>fetch(`http://localhost:3000/my-classes/${params.id}`),
        Component:UpdateAddClass
      }
    ]
  }
]);
