import request from '@/utils/request.js'

export const getHomePage = () => {
  return request('homepage', 'get')
}

export const getProducts = () => {
  return request('products', 'get')
}
