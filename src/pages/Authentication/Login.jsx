
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import loginlottie from '../../assets/Login.json';
import Lottie from 'lottie-react';



const Login = () => {

    return (
        <div className='flex justify-center items-center mt-10 mb-10'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="flex justify-center mt-5">
                    <Lottie style={{ width: '200px' }} animationData={loginlottie} loop={true} />
                </div>
                <h1 className="text-5xl font-bold p-3">Login now!</h1>
                <div className='p-3'>

                    <button className='btn w-full flex gap-5'><FcGoogle size={25} /> <p>Login With Google</p></button>
                </div>
                <form className="card-body">

                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            className="input"
                            placeholder="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must be more than 6 characters, including number, lowercase letter, uppercase letter" />
                        <p>Forgot password?</p>

                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                        <p className='font-bold text-center pt-4'>Don't Have an account? <Link to="/register" className='text-red-500'>Register</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;