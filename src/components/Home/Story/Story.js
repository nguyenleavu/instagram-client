import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StoryItem from './StoryItem';
import Slider from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import { getAllStory } from '@/services/story/storyServices';

const Story = () => {
    const [storyList, setStoryList] = useState([]);

    const { user } = useSelector((state) => state.auth);

    // slider
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    marginRight: '50px',
                    zIndex: 10,
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    marginLeft: '40px',
                    zIndex: 10,
                }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await getAllStory(user.token);
            setStoryList(result);
        };
        fetchAPi();
    }, []); 

    return storyList ? (
        <div className='h-[117px] w-full py-4 mt-4'>
            <Slider {...settings}>
                {storyList &&
                    storyList.map((story, index) => (
                        <StoryItem
                            key={index}
                            username={story.User.user_name}
                            avatar={story.User.avatar}
                            isSeen={story.isSeen}
                        />
                    ))}
                {storyList && storyList.length < 5 && (
                    <div className='w-20'></div>
                )}
                {storyList && storyList.length < 5 && (
                    <div className='w-20'></div>
                )}
                {storyList && storyList.length < 4 && (
                    <div className='w-20'></div>
                )}
                {storyList && storyList.length < 3 && (
                    <div className='w-20'></div>
                )}
                {storyList && storyList.length < 2 && (
                    <div className='w-20'></div>
                )}
            </Slider>
        </div>
    ) : (
        <div className='h-[117px] w-full py-4 mt-4 flex items-center justify-between'>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
            <div className='h-16 w-16 bg-[#262626] rounded-full dark:bg-[#262626]'></div>
        </div>
    );
};

export default Story;
