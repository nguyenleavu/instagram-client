import React from 'react';
import SideBar from '../SideBar/SideBar';

const Layout = ({ children }) => {
    return (
        <>
            <div className='hidden md:flex'>
                <SideBar />
                <main className='flex-1 min-h-screen h-full flex justify-center bg-body-dark w-full pl-[72px] lg:pl-[244px] 2xl:pl-[335px]'>
                    {children}
                </main>
            </div>
            <div className='flex md:hidden'>Yo</div>
        </>
    );
};

export default Layout;
