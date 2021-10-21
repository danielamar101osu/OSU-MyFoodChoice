import axios from 'axios'
import * as firebase from 'firebase'

const ENDPOINT = `https://us-central1-osumyfoodchoiceapp-a8fd6.cloudfunctions.net/api`

export async function get(path, location) {
  try {
    console.log(`get: ${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}?${Object.keys(location).map(el => `${el}=${location[el]}`).join('&')}`)
    let res = await axios.get(`${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}?${Object.keys(location).map(el => `${el}=${location[el]}`).join('&')}`)
    return res.data;
  } catch (e) {
    console.log(e, 'err', JSON.stringify(e))
    return e
  }
}

export async function put(path, data) {
  try {
    console.log(`put: ${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`)
    let res = await axios.put(`${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`, data)
    return res.data;
  } catch (e) {
    console.log(e, 'err', JSON.stringify(e))
    return e
  }
}