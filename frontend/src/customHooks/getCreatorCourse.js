import { useEffect } from 'react';
import { serverUrl } from '../config'; // ✅ Import from config
import axios from 'axios';
import { setCreatorCourseData } from '../redux/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useGetCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreator", {
          withCredentials: true,
        });
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch courses");
      }
    };

    if (userData) {
      creatorCourses();
    }
  }, [userData, dispatch]);
};

export default useGetCreatorCourse;
