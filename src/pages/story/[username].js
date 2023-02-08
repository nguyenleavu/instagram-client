import Head from '@/components/Home/Story/Head';
import { getAllStory, seenStory } from '@/services/story/storyServices';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stories from 'react-insta-stories';

const StoryPage = () => {
    const [stories, setStories] = useState([]);
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);
    const [currentId, setCurrentId] = useState(0);

    const router = useRouter();
    const { user } = useSelector((state) => state.auth);

    const myLoader = ({ src }) => {
        return src;
    };

    useEffect(() => {
        const listUsername = [];
        const stories = [];
        const fetchAPi = async () => {
            const result = await getAllStory(user.token);
            await result.map((item) => listUsername.push(item.User.user_name));
            const index = listUsername.findIndex(
                (item) => item == router.query.username
            );
            setNext(listUsername[index + 1]);
            setPrev(listUsername[index - 1]);
            result &&
                result[index]?.User.Stories.map((item, index) => {
                    return item.story_file.search('mp4') !== -1
                        ? stories.push({
                              id_story: result[index]?.User.Stories[index].id,
                              url: item.story_file,
                              duration: 5000,
                              type: 'video',
                              id: item.id,
                          })
                        : stories.push({
                              url: item.story_file,
                              id: item.id,
                              id_story: result[index]?.User.Stories[index].id,
                          });
                });

            setStories(stories);
        };
        fetchAPi();
    }, [router.query.username]);

    const handlePrev = () => {
        if (currentId === 0) {
            router.push(`/story/${prev}`);
        } else {
            setCurrentId(currentId - 1);
        }
    };

    const handleNext = () => {
        if (currentId >= stories.length - 1) {
            if (next) {
                router.push(`/story/${next}`);
            }
            setCurrentId(0);
        } else {
            setCurrentId(currentId + 1);
        }
    };
    console.log('stories', stories);

    return (
        <div className='flex items-center bg-[#1a1a1a] w-full justify-center text-white relative'>
            {prev && (
                <button
                    onClick={handlePrev}
                    className='absolute left-10 transition-all duration-100 hover:text-gray-300'
                >
                    <i className='fa-solid fa-angle-left text-5xl '></i>
                </button>
            )}
            {stories.length > 0 && (
                <Stories
                    currentIndex={currentId}
                    height={'90vh'}
                    width={'50vh'}
                    loader
                    defaultInterval={1500}
                    keyboardNavigation={true}
                    stories={stories}
                    storyStyles={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                    storyContainerStyles={{
                        borderRadius: 8,
                        overflow: 'hidden',
                        boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                    onStoryEnd={(s, st) => {
                        setCurrentId((currentId) => currentId + 1);
                    }}
                    onStoryStart={(s, st) => {
                        setCurrentId((currentId) => currentId + 1 - 1);
                    }}
                    onAllStoriesEnd={async () => {
                        await seenStory(stories[0].id_story, user.token);
                        if (next) {
                            router.push(`/story/${next}`);
                        }
                        setCurrentId((currentId) => 0);
                    }}
                />
            )}

            <button
                onClick={handleNext}
                className='absolute right-10 transition-all duration-100 hover:text-gray-300'
            >
                <i className='fa-solid fa-angle-right text-5xl'></i>
            </button>
        </div>
    );
};

export default StoryPage;
