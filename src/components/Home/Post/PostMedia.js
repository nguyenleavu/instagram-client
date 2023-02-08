import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useElementOnScreen from '@/components/hooks/useElementOnScreen';

const PostMedia = ({ data, handleLike, username }) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const videoRef = useRef(null);

    const myLoader = ({ src }) => {
        return src;
    };

    const options = {
        root: null,
        rootMargin: '10px',
        threshold: 0.8,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    const handleVideo = () => {
        if (!playing) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    return (
        data &&
        username && (
            <div className='flex justify-center max-h-[587px] h-auto   border-[1px] border-border-nav'>
                {data?.search('mp4') !== -1 ? (
                    <div className='relative flex justify-center -z-10'>
                        <video
                            ref={videoRef}
                            loop
                            muted={muted}
                            className='w-[468px] cursor-pointer '
                            onClick={handleVideo}
                            onDoubleClick={() => handleLike()}
                        >
                            <source src={data} />
                        </video>
                        {!playing && (
                            <button
                                className='absolute top-[50%]'
                                onClick={handleVideo}
                                onDoubleClick={() => handleLike()}
                            >
                                <i className='fa-solid fa-play text-6xl'></i>
                            </button>
                        )}
                        <button
                            className='absolute bottom-4 right-4 p-2 h-8 w-8 bg-[#262626] rounded-full text-gray-300 flex items-center justify-center'
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <i className='fa-solid fa-volume-xmark'></i>
                            ) : (
                                <i className='fa-sharp fa-solid fa-volume-high'></i>
                            )}
                        </button>
                    </div>
                ) : (
                    <Image
                        className='max-h-[585px] max-w-[468px] -z-10'
                        src={data}
                        alt={username}
                        priority={true}
                        width={468}
                        height={525}
                        loader={myLoader}
                        unoptimized={true}
                        style={{ height: 'auto' }}
                    />
                )}
            </div>
        )
    );
};

export default PostMedia;
