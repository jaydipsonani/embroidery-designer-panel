import Head from 'next/head';
import ProfileLanding from '@/components/ProfileLanding';

const ProfileInfo = () => {
    return (
        <>
            <Head>
                <title>profile</title>

                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main style={{ background: '#fff' }}>
                <ProfileLanding />
            </main>
        </>
    );
};

export default ProfileInfo;
