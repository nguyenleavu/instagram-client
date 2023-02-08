import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = ({
    title,
    route,
    iconLight,
    iconBold,
    avatar,
    setOpenModal,
    activeModal,
    modalSearch,
    modalNotification,
}) => {
    const router = useRouter();

    const myLoader = ({ src }) => {
        return src;
    };

    return (
        <div className='h-16 flex items-center '>
            <div
                className='group p-3 my-2 hover:bg-nav-hover hover:rounded-3xl w-full transition-all duration-1000 '
                onClick={setOpenModal}
            >
                {route ? (
                    <Link
                        href={route}
                        className='flex items-center h-6 cursor-pointer '
                    >
                        {avatar ? (
                            <span
                                className={
                                    router.asPath == route
                                        ? 'rounded-full border-2 group-hover:w-8 group-hover:h-8 border-white w-7 h-7 font-bold flex items-center justify-center transition-all'
                                        : 'rounded-full font-normal flex items-center justify-center'
                                }
                            >
                                <Image
                                    className='rounded-full min-w-[24px]'
                                    src={avatar}
                                    alt='avatar'
                                    width={24}
                                    height={24}
                                    loader={myLoader}
                                    unoptimized={true}
                                />
                            </span>
                        ) : (
                            <span className='group-hover:scale-105 transition-transform duration-300'>
                                {router.asPath == route
                                    ? modalSearch || modalNotification
                                        ? iconLight
                                        : activeModal
                                        ? iconLight
                                        : iconBold
                                    : iconLight}
                            </span>
                        )}

                        {!activeModal && (
                            <p
                                className={
                                    router.asPath == route
                                        ? 'font-bold text-white pl-4 text-base hidden xl:block '
                                        : 'text-white pl-4 text-base font-normal hidden xl:block '
                                }
                            >
                                {title}
                            </p>
                        )}
                    </Link>
                ) : (
                    <div
                        className={
                            modalSearch || modalNotification
                                ? 'flex items-center cursor-pointer h-12 w-12 border-[1px] border-collapse-color border-white -translate-x-3 justify-center rounded-full transition-all duration-1000'
                                : 'flex items-center h-6 cursor-pointer'
                        }
                        onClick={setOpenModal}
                    >
                        <span className='group-hover:scale-105 transition-transform duration-1000   '>
                            {modalSearch || modalNotification
                                ? iconBold
                                : iconLight}
                        </span>

                        {!activeModal && (
                            <p
                                className={
                                    router.asPath == route
                                        ? 'font-bold text-white pl-4 text-base hidden xl:block'
                                        : 'text-white pl-4 text-base font-normal hidden xl:block transition-all duration-1000 delay-300'
                                }
                            >
                                {title}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;
