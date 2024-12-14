"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, facebookProvider, googleProvider, signInWithPopup } from '../../../utils/firebase';
import Image from 'next/image';

export default function LoginPage() {
    const [username, setUsername] = useState('emilys');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            router.push('/home');
        }
    }, [router]);

    // const validateInput = () => {
    //     if (!/\S+@\S+\.\S+/.test(email)) {
    //         setError('Please enter a valid email.');
    //         return false;
    //     }
    //     if (password.length < 8) {
    //         setError('Password must be at least 8 characters.');
    //         return false;
    //     }
    //     return true;
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        // if (!validateInput()) return;

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('user', JSON.stringify(data));
                router.push('/home');
            } else {
                setError(data.message || 'Login failed, please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <div className='w-11/12 py-10 flex items-center justify-between'>
                {/* <div className='w-[40%] md:flex hidden h-[540px]'>
                    <img src="/assets/illustration.png" alt="image" />
                </div> */}
                <div className='w-[40%] md:flex hidden h-[540px] relative'>
                    <Image
                        src='/assets/illustration.png'
                        alt="image"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
                <div className="flex w-full md:w-[45%] bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex-1">
                        <h2 className="lg:text-[36px] max-sm:text-[24px] max-lg:text-[28px] font-medium text-black">Welcome to</h2>
                        <h1 className='lg:text-[46px] max-sm:text-[28px] max-lg:text-[36px] font-black text-[#6358DC]'>Unstop</h1>
                        <button
                            className="w-full text-black font-medium border-[1px] flex items-center justify-center gap-3 mt-4 py-3 px-4 rounded-[16px] mb-2"
                            onClick={handleGoogleLogin}
                        >
                            <img src="/assets/Frame1116607310.png" alt="Google logo" />
                            Login with Google
                        </button>
                        <button
                            className="w-full text-black font-medium border-[1px] flex items-center justify-center gap-3 mt-4 py-3 px-4 rounded-[16px] mb-2"
                            onClick={handleFacebookLogin}
                        >
                            <img src="/assets/Vector (2).png" alt="" />
                            Login with Facebook
                        </button>
                        <div className="text-center text-gray-500 mb-4">OR</div>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4 rounded-[16px] p-4 bg-[#F4F4F4] flex items-center gap-3">
                                <img src="/assets/account_circle.png" alt="account" />
                                <div className='w-full'>
                                    <label className="block text-sm font-semibold">Username</label>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full focus:outline-none font-bold placeholder:font-normal border-none border-gray-300 bg-transparent rounded"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 rounded-[16px] p-4 bg-[#F4F4F4] flex items-center gap-3">
                                <img src="/assets/mail.png" alt="email" />
                                <div className='w-full'>
                                    <label className="block text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full focus:outline-none font-bold placeholder:font-normal border-none border-gray-300 bg-transparent rounded"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 rounded-[16px] p-4 bg-[#F4F4F4] flex items-center gap-3">
                                <img src="/assets/key.png" alt="email" />
                                <div className='w-full'>
                                    <label className="block text-sm font-semibold">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full focus:outline-none font-bold placeholder:font-normal border-none border-gray-300 bg-transparent rounded"
                                    />
                                </div>
                                <img onClick={togglePasswordVisibility} className="cursor-pointer" src="/assets/visibility.png" alt="view" />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className='flex w-full justify-between'>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="mr-2"
                                    />
                                    <label className="text-sm">Remember me</label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                            </div>

                            <button type="submit" className="w-full h-[77px] bg-indigo-600 font-semibold text-white py-2 px-4 rounded-[16px]">
                                Login
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p className="text-sm">Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
