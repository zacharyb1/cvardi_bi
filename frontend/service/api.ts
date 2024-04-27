//@ts-ignore
import axios, { AxiosRequestConfig } from 'axios'

const apiServerUrl = process.env.NEXT_PUBLIC_API_URL

import { v4 as uuid } from "uuid";

export const uploadUserPhoto = async (
  file: File,
  // username: string,
  // id: string,
) => {
  const fd = new FormData()
  const unique_id = uuid();
  fd.append('image', file)
  fd.append('id', unique_id)
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user`,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: fd,
  }
  const response = await axios(config)
  return {
    ...response.data,
    id: unique_id,
  }
}



export const fetchImages = async (userId?: string) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/images?userId=${userId || ''}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }
  const result = await axios(config)
  return result
}
