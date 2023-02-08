import * as Icon from '../../Icon/Icon';
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { getDetailPost, likePost } from '@/services/post/postServices';
import { useSelector } from 'react-redux';
import * as IconPost from '../../Icon/Icon';
import moment from 'moment';
import Image from 'next/image';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import {
    addComment,
    deleteComments,
    likeComments,
} from '@/services/post/commentsServices';
import following from '@/services/user/followingServices';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000099',
        zIndex: '10',
    },
    content: {
        left: '2.5%',
        right: '2.5%',
        bottom: '2.5%',
        top: '2.5%',
        padding: '0px',
        backgroundColor: '#00000000',
        border: 'none',
    },
};

const DetailPost = ({ id }) => {
    const [playing, setPlaying] = useState(false);
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [commentsValue, setCommentValue] = useState('');
    const [render, setRender] = useState(false);

    const videoRef = useRef(null);

    const { user } = useSelector((state) => state.auth);
    const myLoader = ({ src }) => {
        return src;
    };

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await getDetailPost(id, user.token);
            setPost(result);
        };
        fetchAPi();
    }, [render]);

    // handel Modal
    const handleModal = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    // post a like
    const handleLike = async () => {
        await likePost(post?.id, user.token);
        setRender(!render);
    };

    // video
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

    const handleComments = async (e) => {
        e.preventDefault();
        await addComment(post?.id, commentsValue, user.token);
        setCommentValue('');
        setShowEmojis(false);
        setRender(!render);
    };

    const MoreComments = ({ item }) => (
        <Tippy
            trigger='click'
            zIndex={99}
            offset={[70, -40]}
            interactive
            render={(attrs) => (
                <div
                    className='w-40  font-semibold bg-[#262626] rounded-lg text-red-500 shadow-sm '
                    {...attrs}
                >
                    {item.user_id === user.user.id ? (
                        <div
                            className='h-8 flex items-center rounded-lg justify-center w-full bg-[#262626] hover:opacity-90'
                            onClick={async () => {
                                await deleteComments(item?.id, user.token);
                                setRender(!render);
                            }}
                        >
                            Delete
                        </div>
                    ) : (
                        <div className='h-8 flex items-center rounded-lg justify-center w-full bg-[#262626] hover:opacity-90'>
                            Report
                        </div>
                    )}
                </div>
            )}
        >
            <button className='opacity-0 inline-block group-hover:opacity-100 ml-2 text-grey-border-focus transition-all duration-300 relative'>
                {item.user_id === user.user.id}

                <i className='fa-solid fa-ellipsis'></i>
            </button>
        </Tippy>
    );

    return (
        <>
            <button onClick={handleModal}>
                <Icon.Comments />
            </button>

            <Modal
                isOpen={open}
                onRequestClose={handleModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div
                    className='text-white w-full h-full bg-transparent hidden sm:flex justify-center -z-10'
                    onClick={() => setOpen(false)}
                >
                    <div
                        className='h-full flex items-center'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className='absolute text-white right-0 top-0 z-50'
                            onClick={() => setOpen(false)}
                        >
                            <i className='fa-solid fa-xmark text-2xl'></i>
                        </button>
                        <div className='flex items-center justify-end w-1/3 lg:w-1/2 bg-black'>
                            <div className=''>
                                {post?.media_file?.search('mp4') !== -1 ? (
                                    <video
                                        ref={videoRef}
                                        loop
                                        autoPlay
                                        className='h-[858px] w-[482px] cursor-pointer'
                                        onClick={handleVideo}
                                    >
                                        <source src={post?.media_file} />
                                    </video>
                                ) : (
                                    <Image
                                        className='h-1/3 lg:h-[858px] w-auto'
                                        src={post?.media_file}
                                        alt={post?.User?.username}
                                        priority={true}
                                        width={3.2}
                                        height={4}
                                        loader={myLoader}
                                        unoptimized={true}
                                    />
                                )}
                            </div>
                        </div>

                        <div className='w-2/3 lg:w-1/2 flex justify-start h-1/3 md:h-[90%] xl:h-full  flex-col relative overflow-hidden bg-black border-l-[2px] border-[#262626]'>
                            <div className='w-[490px] '>
                                <div className='flex items-center justify-between py-[14px] pr-1 border-b-[1px] border-[#262626]   px-4'>
                                    <div className='flex items-center '>
                                        <Image
                                            className='shadow-lg rounded-full min-w-[32px] max-h-[32px] transition-all duration-300'
                                            src={post?.User.avatar}
                                            alt={post?.User.user_name}
                                            width={32}
                                            height={32}
                                            loader={myLoader}
                                            unoptimized={true}
                                        />
                                        <h4 className='ml-3'>
                                            {post?.User?.user_name}
                                        </h4>
                                        {post?.User?.followings?.some(
                                            (item) =>
                                                item.follower_user_id ==
                                                user.user.id
                                        ) ? (
                                            ''
                                        ) : (
                                            <>
                                                <div className='bg-[#ababab] mx-[5px] h-1 w-1 rounded-full' />
                                                <button
                                                    className=' text-sm text-primary hover:text-white font-semibold cursor-pointer transition-colors duration-300'
                                                    onClick={async () => {
                                                        await following(
                                                            post.user_id,
                                                            user.token
                                                        );
                                                        setRender(!render);
                                                    }}
                                                >
                                                    Follow
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <button className='px-2'>
                                        <i className='fa-solid fa-ellipsis'></i>
                                    </button>
                                </div>
                                <div className='p-4 h-[1000px] overflow-auto'>
                                    {post?.comments.length > 0 ? (
                                        post?.comments.map((item, index) => (
                                            <div
                                                className='mt-3 group cursor-pointer'
                                                key={index}
                                            >
                                                <div className='flex justify-between'>
                                                    <div className='flex'>
                                                        <Image
                                                            className='shadow-lg rounded-full min-w-[32px] max-h-[32px] transition-all duration-300 mr-[18px]'
                                                            src={
                                                                item?.User
                                                                    .avatar
                                                            }
                                                            alt={
                                                                item?.User
                                                                    .user_name
                                                            }
                                                            width={32}
                                                            height={32}
                                                            loader={myLoader}
                                                            unoptimized={true}
                                                        />
                                                        <div className='mb-2 text-sm'>
                                                            <Link
                                                                href={`/${item?.User?.user_name}`}
                                                            >
                                                                <h3 className='font-semibold mr-1 inline-block cursor-pointer'>
                                                                    {
                                                                        item
                                                                            ?.User
                                                                            ?.user_name
                                                                    }
                                                                </h3>
                                                            </Link>
                                                            <span className='disappear appear'>
                                                                {item?.comments}
                                                            </span>
                                                            <div>
                                                                <span className='text-grey-border-focus text-xs mr-3'>
                                                                    {moment(
                                                                        post?.createdAt
                                                                    )
                                                                        .startOf(
                                                                            'hour'
                                                                        )
                                                                        .fromNow()}
                                                                </span>
                                                                {item
                                                                    .likeComments
                                                                    .length >
                                                                    0 && (
                                                                    <span className='text-xs text-grey-border-focus'>
                                                                        {
                                                                            item
                                                                                .likeComments
                                                                                .length
                                                                        }{' '}
                                                                        likes
                                                                    </span>
                                                                )}
                                                                <MoreComments
                                                                    item={item}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className='ml-3'
                                                        onClick={async () => {
                                                            await likeComments(
                                                                item.id,
                                                                user.token
                                                            );
                                                            setRender(!render);
                                                        }}
                                                    >
                                                        {item.likeComments.some(
                                                            (item) =>
                                                                item.user_id ==
                                                                user.user.id
                                                        ) ? (
                                                            <IconPost.SmallHeartLike />
                                                        ) : (
                                                            <IconPost.SmallHeart />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className=' flex items-center justify-center h-10 md:h-2/3'>
                                            <div className='text-center'>
                                                <h4 className='font-bold text-2xl'>
                                                    No comments yet.
                                                </h4>
                                                <p className='text-sm mt-1'>
                                                    Start the conversation.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='absolute bottom-0 w-full z-10 bg-black border-t-[1px] border-[#262626]'>
                                <div className='flex items-center justify-between px-4 py-2 '>
                                    <div className='-translate-x-2'>
                                        <button
                                            className='h-10 w-10 p-2'
                                            onClick={handleLike}
                                        >
                                            {post?.likes.some(
                                                (item) =>
                                                    item.user_id == user.user.id
                                            ) ? (
                                                <IconPost.HeartLike />
                                            ) : (
                                                <IconPost.HearUnLike />
                                            )}
                                        </button>
                                        <button className='h-10 w-10 p-2'>
                                            <IconPost.Comments />
                                        </button>
                                        <button className='h-10 w-10 p-2'>
                                            <IconPost.Message />
                                        </button>
                                    </div>
                                    <div>
                                        <button className='h-10 w-10 p-2'>
                                            <IconPost.Saved />
                                        </button>
                                    </div>
                                </div>
                                {post?.likes?.length > 0 && (
                                    <p className='text-sm font-semibold cursor-pointer px-4 mb-1'>
                                        {post?.likes?.length} likes
                                    </p>
                                )}
                                <p className='text-[10px] font-normal text-[#a8a8a8] px-4 mb-4 '>
                                    {moment(post?.createdAt)
                                        .startOf('hour')
                                        .fromNow()
                                        .toUpperCase()}
                                </p>
                                <form
                                    className='flex justify-between text-sm items-center  py-[6px] px-4 h-12 border-t-[1px] border-[#262626]'
                                    onSubmit={handleComments}
                                >
                                    <div className='pr-4'>
                                        <Tippy
                                            trigger='click'
                                            offset={[10, -94]}
                                            interactive
                                            render={(attrs) => (
                                                <div
                                                    className='w-40  font-semibold bg-[#262626] rounded-lg text-red-500 shadow-sm '
                                                    {...attrs}
                                                >
                                                    <div className='absolute -top-[440px] -right-[174px] h-[325px] overflow-hidden rounded-lg   '>
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
                                                            onEmojiSelect={
                                                                addEmoji
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <button
                                                type='button'
                                                className='pl-1 flex justify-center items-center'
                                                onClick={() =>
                                                    setShowEmojis(!showEmojis)
                                                }
                                            >
                                                <Icon.BigEmoji />
                                            </button>
                                        </Tippy>
                                    </div>
                                    <div className='flex-1 flex items-center'>
                                        <textarea
                                            value={commentsValue}
                                            placeholder='Add ad comment'
                                            className='bg-transparent w-full h-5 outline-none'
                                            onChange={(e) =>
                                                setCommentValue(e.target.value)
                                            }
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DetailPost;
