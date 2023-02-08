import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const StoryItem = ({ username, avatar, isSeen }) => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    const seen = isSeen && isSeen?.find((item) => item.user_id === user.user.id);

    const myLoader = ({ src }) => {
        return src;
    };

    const handleClick = () => {
        router.push(`/story/${username}`);
    };

    return (
        <div
            className='flex flex-col items-center cursor-pointer'
            onClick={handleClick}
        >
            <div
                className={
                    seen
                        ? 'h-16 w-16 rounded-full flex justify-center items-center mt-1 mb-2'
                        : 'border-2 border-t-pink-400 border-b-yellow-400 border-l-orange-400 border-r-red-400 h-16 w-16 rounded-full flex justify-center items-center mt-1 mb-2'
                }
            >
                <Image
                    className='rounded-full '
                    src={avatar}
                    alt={username}
                    width={56}
                    height={56}
                    priority
                    loader={myLoader}
                    unoptimized={true}
                />
            </div>
            <h4 className='font-normal text-xs text-grey-border-focus truncate w-14'>
                {username}
            </h4>
        </div>
    );
};

export default StoryItem;
