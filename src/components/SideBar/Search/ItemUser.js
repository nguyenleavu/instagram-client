import { postRecent } from '@/services/user/recentServiecs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const ItemUser = ({ id, avatar, tick, username, fullname, click }) => {
    const { user } = useSelector((state) => state.auth);

    const myLoader = ({ src }) => {
        return src;
    };

    const handleClick = async () => {
        await postRecent(id, user.token);
        click();
    };

    return (
        <div>
            {avatar && (
                <Link
                    href={`/${username}`}
                    className='flex px-6 py-2 hover:bg-nav-hover transition-all duration-500 delay-75 cursor-pointer'
                    onClick={handleClick}
                >
                    <Image
                        className='rounded-full min-w-[44px] max-h-[44px] mr-3 transition-all duration-300'
                        src={avatar}
                        alt={username}
                        width={44}
                        height={44}
                        loader={myLoader}
                        unoptimized={true}
                    />
                    <div className='flex flex-col justify-center'>
                        <p className='text-sm font-semibold'>
                            {username}
                            {tick && (
                                <span className='ml-1'>
                                    <i className='fa-sharp fa-solid fa-circle-check text-[10px] rounded-full bg-white text-primary'></i>
                                </span>
                            )}
                        </p>
                        <h4 className='text-sm text-grey-border-focus   '>
                            {fullname}
                        </h4>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ItemUser;
