import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../config';
import { setUserData } from '../redux/userSlice';

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getCurrentUser", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching user:", error);
        }
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
