import { getAllPost } from '@/services/post/postServices';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAPi = async () => {
            if (pageNum > 1) {
                const result = await getAllPost(user.token, pageNum);
                setPosts((prev) => [...prev, ...result]);
            } else {
                const result = await getAllPost(user.token, pageNum);
                setPosts(result);
            }
        };
        fetchAPi();
    }, [pageNum]);

    return (
        <div className='mt-4 flex-1 mb-10 z-0'>
            <InfiniteScroll
                dataLength={posts && posts.length}
                next={() => setPageNum(pageNum + 1)}
                hasMore={true}
                loader={
                    <div role='status' className=''>
                        <div className='flex items-center py-4 h-[60px]'>
                            <div className='h-8 w-8 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
                            <div className='flex-1 flex flex-col justify-center h-8 ml-2'>
                                <div className='h-[10px] mb-1 bg-[#262626]  dark:bg-[#262626] w-36 '></div>
                                <div className='h-[10px] mb-1 bg-[#262626]  dark:bg-[#262626] w-24 '></div>
                            </div>
                        </div>

                        <div className='h-[470px] w-[470px] brightness-[80%] invert-[55%]  bg-[#262626]'></div>
                    </div>
                }
            >
                {posts &&
                    posts.map((post, index) => (
                        <PostItem
                            key={index}
                            caption={post.caption}
                            likes={post.likes}
                            file={post.media_file}
                            createAt={post.createdAt}
                            id={post.id}
                            comments={post.comments}
                            avatar={post.User.avatar}
                            fullname={post.User.full_name}
                            username={post.User.user_name}
                            pageNum={pageNum}
                        />
                    ))}
            </InfiniteScroll>
        </div>
    );
};

export default Post;
