import { request } from '@/utils/request'

const baseUrl = url => `api/${url}`

export function users({ method = 'get', data = null }) {
  return request({
    url: baseUrl('User'),
    method,
    data
  })
}

export function roles({ method = 'get', data = null }) {
  return request({
    url: baseUrl('Role'),
    method,
    data
  })
}

export function excursion({ method, data = null }) {
  return request({
    url: baseUrl('Excursion'),
    method,
    data
  })
}

export function excursionGroup({ method, data = null, params = null }) {
  return request({
    url: baseUrl('ExcursionGroup'),
    method,
    data,
    params
  })
}

export function hotel({ method, data = null }) {
  return request({
    url: baseUrl('Hotel'),
    method,
    data
  })
}

export function tour({ method, data, params }) {
  return request({
    url: baseUrl('Tour'),
    method,
    data,
    params
  })
}

export function getExcursionGroup() {
  return request({
    url: baseUrl('ExcursionGroup'),
    method: 'get'
  })
}

export function getTour() {
  return request({
    url: baseUrl('Tour'),
    method: 'get'
  })
}

export function setTour(data) {
  return request({
    url: baseUrl('Tour'),
    method: 'post',
    data
  })
}

export function deleteTour(data) {
  return request({
    url: baseUrl('Tour'),
    method: 'delete',
    data
  })
}
