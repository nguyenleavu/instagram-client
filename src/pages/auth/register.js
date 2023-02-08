/* eslint-disable react/no-unescaped-entities */
import routes from '@/config/routes';
import register from '@/services/user/registerServices';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Register = () => {
    const [phone, setPhone] = useState('');
    const [full_name, setFull_name] = useState('');
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            phone,
            full_name,
            user_name,
            email,
            password,
        };

        const fetchAPi = async () => {
            setLoading(true);
            const result = await register(newUser);

            if (result.status) {
                router.push(routes.login);
            } else {
                setError(result.data);
            }

            setLoading(false);
        };
        fetchAPi();
    };

    return (
        <>
            <Head>
                <title>Sign up • Instagram</title>
            </Head>
            <div className='min-h-screen flex flex-col bg-white'>
                <div className='flex-1 flex justify-center items-center py-8'>
                    <div className='h-full w-[350px] flex flex-col items-center translate-y-[-8px]'>
                        <div className='w-full flex flex-col items-center py-[10px] border-[1px] border-grey-border'>
                            <div className='bg-logoImg bg-no-repeat flex w-48 h-16 mt-4 mb-4'></div>
                            <p className='text-[17px] font-semibold mx-10 mb-[10px] text-center text-line'>
                                Sign up to see photos and videos from your
                                friends.
                            </p>
                            <p className='flex items-center justify-center text-sm text-white cursor-pointer bg-primary px-10 w-[268px] h-[34px] rounded-lg hover:bg-primary-hover transition-colors'>
                                <i className='fa-brands fa-square-facebook mr-2 text-lg '></i>
                                <span className='font-semibold'>
                                    Log in with Facebook
                                </span>
                            </p>
                            <div className='flex items-center mx-10 mt-[10px] mb-[18px] justify-center'>
                                <span className='bg-grey-border-focus h-[1px] w-24'></span>
                                <span className='px-4 text-line font-semibold text-[13px]'>
                                    OR
                                </span>
                                <span className='bg-grey-border-focus h-[1px] w-24'></span>
                            </div>
                            <form
                                className='flex flex-col w-full'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type='text'
                                    className='h-9 py-2 pl-2 mx-10 mb-[6px] bg-input-background border-[1px] border-grey-border rounded focus:border-grey-border-focus outline-none text-ellipsis text-sm font-normal '
                                    placeholder='Full name'
                                    value={full_name}
                                    onChange={(e) =>
                                        setFull_name(e.target.value)
                                    }
                                />
                                <input
                                    type='text'
                                    className='h-9 py-2 pl-2 mx-10 mb-[6px] bg-input-background border-[1px] border-grey-border rounded focus:border-grey-border-focus outline-none text-ellipsis text-sm font-normal '
                                    placeholder='User name'
                                    value={user_name}
                                    onChange={(e) =>
                                        setUser_name(e.target.value)
                                    }
                                />
                                <input
                                    type='text'
                                    className='h-9 py-2 pl-2 mx-10 mb-[6px] bg-input-background border-[1px] border-grey-border rounded focus:border-grey-border-focus outline-none text-ellipsis text-sm font-normal '
                                    placeholder='Mobile number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
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
                                <div className='mx-10 my-[10px]'>
                                    <p className='text-xs text-line text-center '>
                                        People who use our service may have
                                        uploaded your contact information to
                                        Instagram.{' '}
                                        <a
                                            href='https://www.facebook.com/help/instagram/261704639352628'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-[#00376b]'
                                        >
                                            Learn More
                                        </a>
                                    </p>
                                    <p className='text-xs text-line text-center '>
                                        By signing up, you agree to our.{' '}
                                        <a
                                            href='https://help.instagram.com/581066165581870/?locale=en_US'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-[#00376b]'
                                        >
                                            Terms
                                        </a>{' '}
                                        ,{' '}
                                        <a
                                            href='https://www.facebook.com/privacy/policy'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-[#00376b]'
                                        >
                                            Privacy Policy
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href='https://help.instagram.com/1896641480634370/'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-[#00376b]'
                                        >
                                            Cookies Policy .
                                        </a>
                                    </p>
                                </div>
                                <button
                                    type='submit'
                                    className='mx-10 my-2 rounded-md text-sm text-white font-semibold  h-8  transition-colors disabled:opacity-70 disabled:hover:bg-none bg-primary hover:bg-primary-hover'
                                >
                                    {loading ? (
                                        <span className='block animate-spin'>
                                            <i className='fa-solid fa-spinner text-white text-sm'></i>
                                        </span>
                                    ) : (
                                        'Sign up'
                                    )}
                                </button>
                                {error && (
                                    <p className='text-text-error text-sm text-center mt-4 mb-8'>
                                        {error}
                                    </p>
                                )}
                            </form>
                        </div>
                        <div className='w-full h-[63px] py-[10px] border-[1px] border-grey-border my-[10px]  flex items-center justify-center'>
                            <p className='text-sm'>
                                Don't have an account?{' '}
                                <Link
                                    href={routes.login}
                                    className='text-primary font-semibold cursor-pointer'
                                >
                                    Log in
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
                    <div className='flex flex-wrap justify-center'>
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

export default Register;
