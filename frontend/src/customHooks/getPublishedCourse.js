import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../utils/serverUrl'
import { useDispatch } from 'react-redux'

const getPublishedCourse = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCourseData = async () => {
            try{
                const result=await axios.get(serverUrl+"/api/course/getPublished",{withCredentials:true})
                dispatch(setCourseData(result.data))
                console.log(result.data)
            }catch(err){
                console.log(err)
            }
        }
        getCourseData()
    }, [])
}

export default getPublishedCourse