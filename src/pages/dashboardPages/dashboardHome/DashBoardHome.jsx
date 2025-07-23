import React from 'react';
import Loading from '../../shared/loading/Loading';
import useUserRole from '../../../hooks/useUserRole';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';

const DashBoardHome = () => {
     const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'student'){
        return <StudentDashboard></StudentDashboard>
    }
    else if(role === 'teacher'){
        return <TeacherDashboard></TeacherDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashBoardHome;