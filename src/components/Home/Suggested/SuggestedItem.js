import following from '@/services/user/followingServices';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SuggestedItem = ({ data, token, isRender }) => {
    const myLoader = ({ src }) => {
        return src;
    };

    const handleFollow = async () => {
        await following(data.id, token);
        isRender();
    };

    return (
        <div className='flex justify-between h-12 py-2 pl-1 items-center'>
            <Link href={`${data.user_name}`} className='h-8 cursor-pointer'>
                <Image
                    className='rounded-full'
                    src={data.avatar}
                    alt={data.user_name}
                    width={32}
                    height={32}
                    priority
                    loader={myLoader}
                    unoptimized={true}
                />
            </Link>
            <div className='ml-3 flex-1 flex justify-center flex-col '>
                <Link href={`/${data.user_name}`}>
                    <h4 className='text-sm leading-[18px] font-semibold text-[#fafafa] cursor-pointer'>
                        {data.user_name}
                    </h4>
                </Link>
                <h4 className='text-xs leading-[16px] font-normal text-grey-border-focus cursor-text'>
                    Suggested for you
                </h4>
            </div>
            <button
                className='w-9 font-normal text-xs text-primary hover:text-[#fafafa] hover:font-semibold transition-colors'
                onClick={handleFollow}
            >
                Follow
            </button>
        </div>
    );
};

export default SuggestedItem;
