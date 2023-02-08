import Image from 'next/image';
import React from 'react';

const Head = ({ url, name }) => {
    const myLoader = ({ src }) => {
        return src;
    };

    return (
        <div className='flex items-center ml-4 mt-2'>
            <Image
                className='shadow-lg rounded-full min-w-[32px] max-h-[32px] mr-[6px] transition-all duration-300'
                src={url}
                alt={name}
                width={32}
                height={32}
                loader={myLoader}
                unoptimized={true}
            />
            <h4 className='text-white text-sm font-normal shadow-md'>{name}</h4>
        </div>
    );
};

export default Head;
