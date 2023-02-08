import Link from 'next/link';
import { useState } from 'react';
import routes from '../../config/routes';
import * as Icon from '../Icon/Icon';
import ModalNotification from './Notification/ModalNotification';
import ModalSearch from './Search/ModalSearch';
import Navigation from './Navigation';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/redux/authSlice';
import { useRouter } from 'next/router';

const SideBar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [modalNotification, setModalNotification] = useState(false);
    const [openMore, setOpenMore] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);

    const classes =
        'w-[72px] xl:w-[244px] 2xl:w-[335px] h-screen px-3 pt-2 pb-5 bg-side-dark transition-all duration-500  border-r-[1px] border-border-nav box-border fixed z-10';
    const activeModal =
        'w-[72px] h-screen px-3 pt-2 pb-5  bg-side-dark transition-all duration-500  border-r-[1px] border-border-nav box-border fixed z-10';

    const handleOpenModalSearch = () => {
        setOpenModal(true);
        setModalSearch(true);
        setModalNotification(false);
    };
    const handleOpenModalNotification = () => {
        setOpenModal(true);
        setModalSearch(false);
        setModalNotification(true);
    };
    const handleCloseModalSearch = () => {
        setOpenModal(false);
        setModalSearch(false);
        setModalNotification(false);
    };

    return (
        <aside className={openModal ? activeModal : classes}>
            {modalSearch && (
                <>
                    <div
                        className='absolute w-screen ml-[72px] bg-transparent h-full '
                        onClick={handleCloseModalSearch}
                    />

                    <ModalSearch
                        modalSearch={modalSearch}
                        click={handleCloseModalSearch}
                    />
                </>
            )}
            {modalNotification && (
                <ModalNotification click={handleCloseModalSearch} />
            )}
            <div className='h-[92px] flex items-center'>
                <div className='px-3 pb-4 pt-[25px] mb-[19px] '>
                    {openModal ? (
                        <Link
                            href={routes.home}
                            className='flex h-8 items-center translate-y-[3px] cursor-pointer hover:scale-105 transition-transform duration-300'
                            onClick={handleCloseModalSearch}
                        >
                            <Icon.LogoIcon />
                        </Link>
                    ) : (
                        <>
                            :{' '}
                            <Link
                                href={routes.home}
                                className='hidden xl:flex h-8 items-center translate-y-[3px] cursor-pointer hover:scale-105 transition-transform duration-300'
                                onClick={handleCloseModalSearch}
                            >
                                <Icon.Logo />
                            </Link>
                            <Link
                                href={routes.home}
                                className='flex xl:hidden h-8 items-center translate-y-[3px] cursor-pointer hover:scale-105 transition-transform duration-300'
                                onClick={handleCloseModalSearch}
                            >
                                <Icon.LogoIcon />
                            </Link>
                            :
                        </>
                    )}
                </div>
            </div>
            <nav>
                <Navigation
                    activeModal={openModal}
                    title='Home'
                    setOpenModal={handleCloseModalSearch}
                    route={routes.home}
                    iconLight={<Icon.LightHome />}
                    iconBold={<Icon.BoldHome />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Search'
                    modalSearch={modalSearch}
                    setOpenModal={handleOpenModalSearch}
                    iconLight={<Icon.LightSearch />}
                    iconBold={<Icon.BoldSearch />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Explore'
                    setOpenModal={handleCloseModalSearch}
                    route={routes.explore}
                    iconLight={<Icon.LightExplore />}
                    iconBold={<Icon.BoldExplore />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Messages'
                    setOpenModal={handleCloseModalSearch}
                    route={routes.message}
                    iconLight={<Icon.LightMessage />}
                    iconBold={<Icon.BoldMessage />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Notifications'
                    modalNotification={modalNotification}
                    setOpenModal={handleOpenModalNotification}
                    iconLight={<Icon.LightNotification />}
                    iconBold={<Icon.BoldNotification />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Create'
                    setOpenModal={() => setOpenModal(true)}
                    iconLight={<Icon.LightPlus />}
                    iconBold={<Icon.BoldPlus />}
                />
                <Navigation
                    activeModal={openModal}
                    title='Profile'
                    setOpenModal={handleCloseModalSearch}
                    route={routes.profile}
                    avatar={user && user.user.avatar}
                />
            </nav>

            <Tippy
                visible={openMore}
                offset={[-80, 0]}
                interactive
                render={(attrs) => (
                    <nav
                        className='ml-3 bg-border-nav w-[238px] h-[308px] rounded-lg flex flex-col items-start font-normal text-[#fafafa]'
                        tabIndex='-1'
                        {...attrs}
                    >
                        <Link
                            href={routes.setting}
                            className='h-12 w-full py-2 px-4 hover:bg-nav-hover transition-all duration-150 flex items-center justify-between'
                            onClick={() => setOpenMore(false)}
                        >
                            <p>Settings</p>
                            <Icon.Setting />
                        </Link>
                        <Link
                            href={routes.profile}
                            className='h-12 w-full py-2 px-4 hover:bg-nav-hover transition-all duration-150 flex items-center justify-between'
                            onClick={() => setOpenMore(false)}
                        >
                            <p>Saved</p>
                            <Icon.Saved />
                        </Link>
                        <button className='h-12 w-full py-2 px-4  hover:bg-nav-hover transition-all duration-150 flex items-center justify-between'>
                            <p>Switch appearance</p>
                            <Icon.Theme />
                        </button>
                        <button className='h-12 w-full py-2 px-4 flex items-center justify-between hover:bg-nav-hover transition-all duration-150 '>
                            <p>Your activity</p>
                            <Icon.Activity />
                        </button>
                        <button className='h-12 w-full py-2 px-4 hover:bg-nav-hover transition-all duration-150 flex items-center justify-between'>
                            <p>Report a problem</p>
                            <Icon.Report />
                        </button>
                        <button className='h-12 w-full py-2 px-4 flex justify-start hover:bg-nav-hover transition-all duration-150'>
                            <p>Switch accounts</p>
                        </button>
                        <button
                            className='h-12 w-full py-2 px-4 flex justify-start hover:bg-nav-hover transition-all duration-150'
                            onClick={() => {
                                dispatch(logOut());
                                router.push(routes.login);
                            }}
                        >
                            <p>Log out</p>
                        </button>
                    </nav>
                )}
            >
                <div
                    className='absolute bottom-5 w-full pr-6'
                    onClick={() => setOpenMore(!openMore)}
                >
                    <div className='group p-3 my-2 hover:bg-nav-hover hover:rounded-3xl w-full transition-all duration-300 text-white flex cursor-pointer font'>
                        <span className='group-hover:scale-105 transition-transform duration-300'>
                            {openMore ? <Icon.BoldMore /> : <Icon.LightMore />}
                        </span>
                        {!openModal && (
                            <span
                                className={
                                    openMore
                                        ? 'pl-4 font-semibold hidden xl:block transition-all duration-300'
                                        : 'pl-4 hidden xl:block transition-all duration-300'
                                }
                            >
                                More
                            </span>
                        )}
                    </div>
                </div>
            </Tippy>
        </aside>
    );
};

export default SideBar;
