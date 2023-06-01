import axios from 'axios'
import { setLocalForage } from '../utils/localForage'
const baseUrl = process.env.VUE_APP_BASE_URL
// base是本地接口，是使用mockjs @/src/mock

export function flatList () {
  return axios({
    method: 'post',
    url: `${baseUrl}/book/list`
  })
}
export function home () {
  return axios({
    method: 'post',
    url: `${baseUrl}/book/home/retrieve`
  })
}
export function detail (book) {
  console.log('Book:' + book.fileName)
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/detail/retrieve`, {
    fileName: book.fileName
  })
}
export function list () {
  return axios({
    method: 'post',
    url: `${baseUrl}/book/list`
  })
}
export function shelf () {
  return axios({
    method: 'post',
    url: `${baseUrl}/book/shelf`
  })
}
export function login (email, password) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/login`, {
    email: email,
    password: password
  })
}
export function register (email, password) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/register`, {
    email: email,
    password: password
  })
}
export function AccessMail (code) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/accessMail`, {
    email: code
  })
}
export function upload (file) {
  console.log('upload' + file)
  const formData = new FormData()
  formData.append('ePUBfile', file)
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  } // 添加请求头
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/privateBook/entry`, formData, config)
}

export function addShelf (bookItem) {
  console.log('booktime' + bookItem.fileName)
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/addShelf`, {
    fileName: bookItem.fileName
  })
}

export function removeShelf (bookItem) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/removeShelf`, {
    fileName: bookItem.fileName
  })
}

export function keywordLog (keyword) {
  console.log('进入api')
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/SearchList/entry`, {
    keyword: keyword
  })
}

export function SearchList () {
  console.log('进入api')
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/SearchList/retrieve`, {
  })
}

export function SaveLocation (fileName, startCfi, readTime) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/location/save`, {
    fileName: fileName,
    startCfi: startCfi,
    readTime: readTime
  })
}
export function getDevLocation (fileName) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/location/getLocation`, {
    fileName: fileName
  })
}
export function SaveSetting (fileName, fontFamily, fontSize, bookmark) {
  return axios.post(`${process.env.VUE_APP_BOOK_URL}/book/font/save`, {
    fileName: fileName,
    fontFamily: fontFamily,
    fontSize: fontSize,
    bookmark: bookmark
  })
}

export function download (book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL + '/api',
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: ProgressEvent => {
      if (onProgress) {
        onProgress(ProgressEvent)
      }
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob, () => {
        if (onSuccess) onSuccess(res)
      }, err => {
        if (onError) onError(err)
      })
    }).catch(err => {
      if (onError) onError(err)
    })
}
