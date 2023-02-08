import routes from '@/config/routes';
import getSuggested from '@/services/user/suggestedServices';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import SuggestedItem from './SuggestedItem';

const Suggested = () => {
    const [suggestedList, setSuggestedList] = useState([]);
    const [isRender, setIsRender] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const myLoader = ({ src }) => {
        return src;
    };

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await getSuggested(5, user.token);
            setSuggestedList(result);
        };
        fetchAPi();
    }, [isRender]);

    return (
        user && (
            <div className='hidden lg:block w-[319px] pt-[30px]'>
                {user && (
                    <div className='flex justify-between mt-4 mb-[10px] h-[66px] items-center'>
                        <Link
                            href={`${user.user.user_name}`}
                            className='h-[56px] cursor-pointer'
                        >
                            <Image
                                className='rounded-full'
                                src={user.user.avatar}
                                alt={user.user.user_name}
                                width={56}
                                height={56}
                                priority
                                loader={myLoader}
                                unoptimized={true}
                            />
                        </Link>
                        <div className='ml-4 flex-1 flex justify-center flex-col '>
                            <Link href={`/${user.user.user_name}`}>
                                <h4 className='text-sm leading-[18px] font-semibold text-[#fafafa] cursor-pointer'>
                                    {user.user.user_name}
                                </h4>
                            </Link>
                            <h4 className='text-sm leading-[18px] font-normal text-grey-border-focus cursor-text'>
                                {user.user.full_name}
                            </h4>
                        </div>
                        <button className='w-9 text-xs text-primary hover:text-[#fafafa] hover:font-semibold transition-colors'>
                            Switch
                        </button>
                    </div>
                )}
                <div className='flex justify-between items-center font-semibold'>
                    <p className='text-sm text-grey-border-focus'>
                        Suggestions for you
                    </p>
                    <Link
                        href={routes.people}
                        className='text-xs text-[#fafafa] hover:opacity-50'
                    >
                        See All
                    </Link>
                </div>
                <div className='py-2'>
                    {suggestedList &&
                        suggestedList.map((item, index) => (
                            <SuggestedItem
                                key={index}
                                data={{
                                    id: item.id,
                                    user_name: item.user_name,
                                    full_name: item.full_name,
                                    avatar: item.avatar,
                                }}
                                isRender={() => setIsRender(!isRender)}
                                token={user.token}
                            />
                        ))}
                </div>
                <Footer />
            </div>
        )
    );
};

export default Suggested;
