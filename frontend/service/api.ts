//@ts-ignore
import axios, { AxiosRequestConfig } from 'axios'
const apiServerUrl = process.env.BACKEND_API_SERVER_URL
import { v4 as uuid } from "uuid";

export const uploadUserPhoto = async (
  file: File,
  // username: string,
  // id: string,
) => {
  const fd = new FormData()
  const unique_id = uuid();

  fd.append('photo', file)
  // fd.append('username', username)
  fd.append('id', unique_id)
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user`,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      // Authorization: `Bearer ${accessToken}`,
    },
    data: fd,
  }
  const response = await axios(config)
  return response
}



export const fetchImages = async (userId: string) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/images?${userId}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }
  const result = await axios(config)
  return result
}
