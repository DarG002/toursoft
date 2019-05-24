import { request } from '@/utils/request'

const baseUrl = url => `api/${url}`

export function login(data) {
  return request({
    url: baseUrl('Account/Login'),
    method: 'post',
    data
  })
}
