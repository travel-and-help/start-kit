import React from 'react';
import Layout from '../../Layout';
import ProfileScreenMenu from './ProfileScreenMenu';
import Profile from './components/ProfileContainer';

export default () => (
    <Layout menu={<ProfileScreenMenu />} >
        <Profile />
    </Layout>
);
