import axios from '@/utils/request'

export function amazonUploadFiles (files) {
  return axios({
    url: 'uploads/uploadFileMulti',
    method: 'post',
    data: files
  })
}
