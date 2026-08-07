import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';


const getCurrentUser = () => {
    const dispatch = useDispatch();
useEffect(() => {
    const fetchUser = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getCurrentUser", {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
        } catch (error) {
            console.error('Error fetching user:', error);
            dispatch(setUserData(null));
        }
    };

    fetchUser();
}, []);
}

export default getCurrentUser
