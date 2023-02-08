import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Profile = () => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <>
            <Head>
                <title>{username}</title>
            </Head>
            <div>Profile</div>
        </>
    );
};

export default Profile;
