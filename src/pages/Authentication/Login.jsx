import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import loginlottie from '../../assets/Login.json';
import Lottie from 'lottie-react';
import Logo from '../shared/logo/Logo';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const {signInUser,socialLogin} = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        signInUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const handleSocialLogin = () =>{
         socialLogin()
         .then(result=>{
            console.log(result.user)
         })
         .catch(error=>{
            console.log(error)
         })
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">

                {/* Left side - Animation */}
                <div className="md:w-1/2 bg-gradient-to-tr from-indigo-200 to-purple-300 flex justify-center items-center p-6">
                    <Lottie animationData={loginlottie} className="w-full max-w-md" loop={true} />
                </div>

                {/* Right side - Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6 flex justify-center">
                        <Link to="/"><Logo></Logo></Link>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            {/* email field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                                
                            />
                            {errors.email?.type === "required" && (
                                <p className='text-red-500' role="alert">Email is required</p>
                            )}
                        </div>

                        <div>
                            {/* password field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                {...register('password', {
                                    required: true,
                                    pattern: {
                                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                        message: 'Must include uppercase, lowercase, and number'
                                    }
                                })}
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Enter your password"

                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            {errors.password?.type === "required" && (
                                <p className='text-red-500' role="alert">Password is required</p>
                            )}
                        </div>

                        <div className="text-sm text-blue-500 hover:underline cursor-pointer">
                            Forgot password?
                        </div>

                        <button className="btn btn-primary w-full text-white tracking-wide">
                            Login
                        </button>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={handleSocialLogin} className="btn w-full flex items-center justify-center gap-3 bg-white border shadow hover:shadow-md transition">
                        <FcGoogle size={24} />
                        <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>

                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-green-400 hover:underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;