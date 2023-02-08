import getDetailUser from '@/services/user/getDetailUser';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import VideoImageThumbnail from 'react-video-thumbnail-image';

const ModalUser = ({ children, username }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchAPi = async () => {
            if (username) {
                const result = await getDetailUser(username);
                setUser(result);
            }
        };
        fetchAPi();
    }, [username]);

    const myLoader = ({ src }) => {
        return src;
    };

    console.log(user);
    return (
        <>
            <Tippy
                offset={[310, -5]}
                placement='bottom-start'
                interactive
                delay={[300, 500]}
                render={(attrs) => (
                    <div
                        className='h-[328px] w-[336px] py-4 bg-blue-700 rounded-lg'
                        {...attrs}
                    >
                        <div className='px-4 flex items-center '>
                            <div className='h-[66px] w-[66px] border-2 border-t-pink-400 border-b-yellow-400 border-l-orange-400 border-r-red-400 rounded-full flex justify-center items-center mt-1 mb-2 cursor-pointer'>
                                {user?.avatar && (
                                    <Image
                                        className='w-2 h-2 shadow-lg rounded-full min-w-[56px] max-h-[56px] transition-all duration-300'
                                        src={user?.avatar}
                                        alt={user?.user_name}
                                        width={56}
                                        height={56}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                )}
                            </div>
                            <div className='flex flex-col ml-3'>
                                <h3 className='font-bold text-base'>
                                    {user?.user_name}
                                </h3>
                                <h4 className='text-sm'>{user?.full_name}</h4>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-center w-[110px] p-2 text-sm first-letter:'>
                                <span className='font-bold'>
                                    {user?.Posts?.length}
                                </span>
                                <p>posts</p>
                            </div>
                            <div className='text-center w-[110px] p-2 text-sm first-letter:'>
                                <span className='font-bold'>
                                    {user?.followers?.length}
                                </span>
                                <p>followers</p>
                            </div>
                            <div className='text-center w-[110px] p-2 text-sm first-letter:'>
                                <span className='font-bold'>
                                    {user?.followings?.length}
                                </span>
                                <p>followings</p>
                            </div>
                        </div>
                        {/* -------------------------------- */}
                        {user?.Posts?.length == 0 && (
                            <div className='flex justify-around'>
                                <div className='h-[110px] w-[110px] bg-white'></div>
                                <div className='h-[110px] w-[110px] bg-white'></div>
                                {/* <div className='h-[110px] w-[110px] bg-white'></div> */}
                            </div>
                        )}

                        {/* ------------------------------------------------------------------- */}
                        {user?.Posts[0]?.length == 1 && (
                            <div className='flex justify-center'>
                                {user?.Posts[0]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[0]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <div>
                                        <VideoImageThumbnail
                                            videoUrl={
                                                user?.Posts[0]?.media_file
                                            }
                                            width={10000}
                                            height={10000}
                                            alt='my test video'
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* -------------------------------------------------------------------------------- */}
                        {user?.Posts[0]?.length == 2 && (
                            <div className='flex justify-around'>
                                {user?.Posts[0]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[0]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <VideoImageThumbnail
                                        videoUrl={user?.Posts[0]?.media_file}
                                        thumbnailHandler={(thumbnail) =>
                                            console.log(thumbnail)
                                        }
                                        width={10000}
                                        height={10000}
                                        alt='my test video'
                                    />
                                )}
                                {user?.Posts[1]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[1]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <VideoImageThumbnail
                                        videoUrl={user?.Posts[1]?.media_file}
                                        thumbnailHandler={(thumbnail) =>
                                            console.log(thumbnail)
                                        }
                                        width={10000}
                                        height={10000}
                                        alt='my test video'
                                    />
                                )}
                            </div>
                        )}

                        {/* --------------------------------------------------------------------- */}
                        {user?.Posts?.length >= 3 && (
                            <div className='flex justify-between'>
                                {user?.Posts[0]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[0]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <VideoImageThumbnail
                                        videoUrl={user?.Posts[0]?.media_file}
                                        thumbnailHandler={(thumbnail) =>
                                            console.log(thumbnail)
                                        }
                                        width={10000}
                                        height={10000}
                                        alt='my test video'
                                    />
                                )}
                                {user?.Posts[1]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[1]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <div className='max-w-[110px] max-h-[110px]'>
                                        <VideoImageThumbnail
                                            videoUrl={user?.Posts[1]?.media_file}
                                            thumbnailHandler={(thumbnail) =>
                                                console.log(thumbnail)
                                            }
                                            width={50000}
                                            height={50000}
                                            alt='my test video'
                                        />
                                    </div>
                                )}
                                {user?.Posts[2]?.media_file?.search('mp4') ===
                                -1 ? (
                                    <Image
                                        className='max-w-[110px] max-h-[110px]'
                                        src={user?.Posts[2]?.media_file}
                                        alt={user?.user_name}
                                        width={10000}
                                        height={10000}
                                        priority={true}
                                        loader={myLoader}
                                        unoptimized={true}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                        }}
                                    />
                                ) : (
                                    <div className='max-w-[110px] max-h-[110px]'>
                                        {user?.Posts[2]?.media_file && (
                                            <VideoImageThumbnail
                                                videoUrl={
                                                    user?.Posts[2]?.media_file
                                                }
                                                width={50000}
                                                height={50000}
                                                alt='my test video'
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        <div></div>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </>
    );
};

export default ModalUser;
