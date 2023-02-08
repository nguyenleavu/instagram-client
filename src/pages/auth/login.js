/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Link from 'next/link';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/authSlice';
import Head from 'next/head';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    const { user, error, loading } = useSelector((state) => state.auth);

    if (user) {
        router.push(routes.home);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchUser({ email, password }));
    };

    return (
        <>
            <Head>
                <title>Login • Instagram</title>
            </Head>
            <div className='min-h-screen flex flex-col bg-white'>
                <div className='flex-1 flex justify-center items-center py-8'>
                    <div className='lg:block md:block hidden bg-loginImg bg-no-repeat h-[600px] w-[400px] bg-cover mr-8'></div>
                    <div className='h-full w-[350px] flex flex-col items-center translate-y-[-8px]'>
                        <div className='w-full flex flex-col items-center py-[10px] border-[1px] border-grey-border'>
                            <div className='bg-logoImg bg-no-repeat flex w-48 h-16 mt-4 mb-10'></div>
                            <form
                                className='flex flex-col w-full'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type='email'
                                    className='h-9 py-2 pl-2 mx-10 mb-[6px] bg-input-background border-[1px] border-grey-border rounded focus:border-grey-border-focus outline-none text-ellipsis text-sm font-normal '
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type='password'
                                    className='h-9 py-2 pl-2 mx-10 mb-[6px] bg-input-background border-[1px] border-grey-border rounded focus:border-grey-border-focus outline-none text-ellipsis text-sm font-normal '
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    className='mx-10 my-2 rounded-md text-sm text-white font-semibold bg-primary h-8 hover:bg-primary-hover transition-colors'
                                    type='submit'
                                >
                                    {loading ? (
                                        <span className='block animate-spin'>
                                            <i className='fa-solid fa-spinner text-white text-sm'></i>
                                        </span>
                                    ) : (
                                        'Log in'
                                    )}
                                </button>
                                <div className='flex items-center mx-10 mt-[10px] mb-[18px] justify-center'>
                                    <span className='bg-grey-border-focus h-[1px] w-24'></span>
                                    <span className='px-4 text-line font-semibold text-[13px]'>
                                        OR
                                    </span>
                                    <span className='bg-grey-border-focus h-[1px] w-24'></span>
                                </div>
                                <p className='flex items-center justify-center mx-10 my-2 text-sm text-facebook cursor-pointer'>
                                    <i className='fa-brands fa-square-facebook mr-2 text-lg '></i>
                                    <span className='font-semibold'>
                                        Log in with Facebook
                                    </span>
                                </p>
                                {error && (
                                    <p className='text-text-error text-sm text-center mt-4 mb-8'>
                                        {error}
                                    </p>
                                )}
                                <span className='text-center text-xs text-[#385898] cursor-pointer'>
                                    Forgot password?
                                </span>
                            </form>
                        </div>
                        <div className='w-full h-[63px] py-[10px] border-[1px] border-grey-border my-[10px]  flex items-center justify-center'>
                            <p className='text-sm'>
                                Don't have an account?{' '}
                                <Link
                                    href={routes.register}
                                    className='text-primary font-semibold cursor-pointer'
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                        <div className='w-full h-[95px] flex flex-col items-center'>
                            <p className='mx-5 my-[5px] text-sm'>
                                Get the app.
                            </p>
                            <div className='flex flex-1 justify-center my-[10px]'>
                                <div className='bg-chPlay bg-no-repeat bg-cover w-[134px] h-10 mr-2 cursor-pointer'></div>
                                <div className='bg-microsoft bg-no-repeat bg-cover w-[112px] h-10 cursor-pointer'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-[134px] px-4 flex items-center flex-col'>
                    <div className='mt-6 flex flex-wrap justify-center'>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Meta
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            About
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Blog
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Jobs
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Help
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>API</span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Privacy
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Terms
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Top Accounts
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Locations
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Instagram Lite
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            Contact Uploading & Non-Users
                        </span>
                    </div>
                    <div className='my-3'>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            English
                        </span>
                        <span className='text-xs mx-2 mb-3 text-line'>
                            {' '}
                            © 2023 Instagram from Meta
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
