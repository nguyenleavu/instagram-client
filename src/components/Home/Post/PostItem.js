import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PostMedia from './PostMedia';
import * as Icon from '../../Icon/Icon';
import { useSelector } from 'react-redux';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { getDetailPost, likePost } from '@/services/post/postServices';
import DetailPost from './DetailPost';
import { addComment, likeComments } from '@/services/post/commentsServices';
import Tippy from '@tippyjs/react/headless';
import following from '@/services/user/followingServices';
import ModalUser from '../ModalUser/ModalUser';

const PostItem = (props) => {
    const [commentsValue, setCommentValue] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [posts, setPosts] = useState([]);
    const [seen, setSeen] = useState(false);

    const myLoader = ({ src }) => {
        return src;
    };

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAPi = async () => {
            if (props.id) {
                const result = await getDetailPost(props.id, user.token);
                const isSeen = result?.User?.Stories[0]?.isSeen?.some(
                    (item) => item.user_id == user.user.id
                );
                setSeen(isSeen);
                setPosts(result);
            }
        };
        fetchAPi();
    }, [isLike]);

    // post a like
    const handleLike = async () => {
        await likePost(props.id, user.token);
        setIsLike(!isLike);
    };

    //handleVideo
    const handleVideo = () => {
        if (!playing) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    // add emoji
    const addEmoji = (e) => {
        let sym = e.unified.split('-');
        let codesArray = [];
        sym.forEach((el) => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setCommentValue(commentsValue + emoji);
    };

    // post a comment
    const handleComments = async (e) => {
        e.preventDefault();
        const comment = await addComment(props?.id, commentsValue, user.token);
        setCommentValue('');
        setShowEmojis(false);
        setIsLike(!isLike);
    };

    return (
        <div className='-z-10'>
            <header className='flex items-center h-14 pl-[5px] pr-1 py-2 -translate-x-1'>
                {posts?.User && (
                    <ModalUser username={posts?.User.user_name}>
                        <Link
                            href={`/story/${posts?.User?.user_name}`}
                            className={
                                seen
                                    ? 'h-10 w-10 rounded-full flex justify-center items-center mt-1 mb-2 cursor-pointer'
                                    : 'border-2 border-t-pink-400 border-b-yellow-400 border-l-orange-400 border-r-red-400 h-10 w-10 rounded-full flex justify-center items-center mt-1 mb-2 cursor-pointer'
                            }
                        >
                            <Image
                                className='w-2 h-2 shadow-lg rounded-full min-w-[32px] max-h-[32px] transition-all duration-300'
                                src={posts?.User?.avatar}
                                alt={posts?.User.user_name}
                                width={32}
                                height={32}
                                priority={true}
                                loader={myLoader}
                                unoptimized={true}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </Link>
                    </ModalUser>
                )}
                <Link href={`/${posts?.User?.user_name}`}>
                    <h4 className='text-sm font-semibold hover:opacity-50 transition-all ml-[10px]'>
                        {posts.User?.user_name}
                    </h4>
                </Link>
                <div className='bg-[#ababab] mx-[5px] h-1 w-1 rounded-full' />
                <p className='text-sm font-normal text-[#a8a8a8]'>
                    {moment(posts.createdAt).startOf('hour').fromNow()}
                </p>
                {posts?.User?.followings?.some(
                    (item) => item.follower_user_id == user.user.id
                ) ? (
                    ''
                ) : (
                    <>
                        <div className='bg-[#ababab] mx-[5px] h-1 w-1 rounded-full' />
                        <p
                            className=' text-sm text-primary hover:text-white font-semibold cursor-pointer transition-colors duration-300'
                            onClick={async () => {
                                await following(posts.user_id, user.token);
                                setIsLike(!isLike);
                            }}
                        >
                            Follow
                        </p>
                    </>
                )}
            </header>
            <PostMedia
                data={posts?.media_file}
                handleLike={handleLike}
                username={posts?.User?.user_name}
            />
            <div className='flex items-center justify-between h-[56px] mt-1 pb-[6px] -z-10'>
                <div className=' flex items-center -translate-x-2'>
                    <span
                        className='p-2 cursor-pointer hover:opacity-50 duration-500 -z-10'
                        onClick={handleLike}
                    >
                        {posts?.likes?.some(
                            (item) => item.user_id == user.user.id
                        ) ? (
                            <Icon.HeartLike />
                        ) : (
                            <Icon.HearUnLike />
                        )}
                    </span>
                    <DetailPost id={props?.id} />
                    <span className='p-2 cursor-pointer hover:opacity-50 -z-50'>
                        <Icon.Message />
                    </span>
                </div>
                <div>
                    <span className=' h-10 w-10 cursor-pointer hover:opacity-50 -z-50'>
                        <Icon.SavedPost />
                    </span>
                </div>
            </div>
            {posts?.likes?.length > 0 && (
                <p className='text-sm font-semibold ml-1 mb-2'>
                    {posts?.likes?.length} likes
                </p>
            )}
            {posts?.caption && (
                <div className='text-sm break-words mb-2'>
                    <Link href={`/${posts?.User?.username}`}>
                        <h4 className='font-semibold mr-1 inline-block cursor-pointer'>
                            {props?.username}
                        </h4>
                    </Link>

                    <ReactReadMoreReadLess
                        readMoreStyle={{ fontSize: '14px', opacity: 0.5 }}
                        charLimit={120}
                        ellipsis='...'
                        readMoreText={`more`}
                        readLessText={''}
                    >
                        {props.caption}
                    </ReactReadMoreReadLess>
                </div>
            )}
            {posts?.comments?.length > 0 && (
                <>
                    <p className='text-sm opacity-50 mb-2 cursor-pointer '>
                        View all {posts?.comments?.length} comments
                    </p>
                    <div className='flex text-sm mb-2 justify-between break-words'>
                        <div className=''>
                            <Link
                                href={`/${posts?.comments[0].User.user_name}`}
                            >
                                <h4 className='font-semibold mr-1 inline-block cursor-pointer'>
                                    {
                                        posts?.comments[
                                            posts?.comments?.length - 1
                                        ].User.user_name
                                    }
                                </h4>
                            </Link>
                            <span className='disappear appear'>
                                {
                                    posts?.comments[posts?.comments?.length - 1]
                                        .comments
                                }
                            </span>
                        </div>
                        <button
                            className='opacity-60'
                            onClick={async () => {
                                await likeComments(
                                    posts?.comments[posts?.comments?.length - 1]
                                        .id,
                                    user.token
                                );
                                setIsLike(!isLike);
                            }}
                        >
                            {posts?.comments[
                                posts?.comments?.length - 1
                            ]?.likeComments?.some(
                                (item) => item.user_id == user.user.id
                            ) ? (
                                <Icon.SmallHeartLike />
                            ) : (
                                <Icon.SmallHeart />
                            )}
                        </button>
                    </div>
                </>
            )}

            <form
                className='flex justify-between text-sm items-center'
                onSubmit={handleComments}
            >
                <div className='flex-1 flex items-center'>
                    <textarea
                        value={commentsValue}
                        placeholder='Add ad comment'
                        className='bg-transparent w-full h-5 outline-none'
                        onChange={(e) => setCommentValue(e.target.value)}
                    />
                    {commentsValue && (
                        <button
                            type='submit'
                            className='text-primary font-semibold mx-2 border-none'
                        >
                            Post
                        </button>
                    )}
                </div>
                <div>
                    <Tippy
                        trigger='click'
                        interactive
                        offset={[160, 10]}
                        render={(attrs) => (
                            <div className='z-50 ' {...attrs}>
                                <div className='rounded-lg h-[325px] overflow-hidden'>
                                    <Picker
                                        data={data}
                                        perLine='7'
                                        emojiSize='34'
                                        emojiButtonSize='44'
                                        navPosition='none'
                                        searchPosition='none'
                                        previewPosition='none'
                                        skinTonePosition='none'
                                        categories='people'
                                        onEmojiSelect={addEmoji}
                                    />
                                </div>
                            </div>
                        )}
                    >
                        <button
                            type='button'
                            className='pl-1 flex justify-center items-center'
                            onClick={() => setShowEmojis(!showEmojis)}
                        >
                            <Icon.Emoji />
                        </button>
                    </Tippy>
                </div>
            </form>
            <div className='h-[0.5px] mt-5 mb-3 bg-[#262626]'></div>
        </div>
    );
};

export default PostItem;
