import axios from 'axios'
import * as firebase from 'firebase'

//Server endpoint
const ENDPOINT = `https://us-central1-osumyfoodchoiceapp-a8fd6.cloudfunctions.net`
//For logging requests to console
const debug = false;

/**
 * Makes a get request to the server
 * 
 * @param path
 *      suffix to endpoint
 * @param {*} location 
 *      data to pass in as a parameter
 * @returns 
 *      data retrieved from server
 */
export async function get(path, location) {
  try {
    if(debug) console.log(`get: ${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}?${Object.keys(location).map(el => `${el}=${location[el]}`).join('&')}`);
    let res = await axios.get(`${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}?${Object.keys(location).map(el => `${el}=${location[el]}`).join('&')}`)
    
    return res.data;
  } catch (e) {
    console.log(e, 'err', JSON.stringify(e))
    return e
  }
}

/**
 * Makes a put request to the server
 * 
 * @param path 
 *      suffix to endpoint
 * @param data 
 *      data to pass in as a parameter
 * @returns 
 *      data retrieved from the server
 */
export async function put(path, data) {
  try {
    if(debug) console.log(`put: ${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`)
    let res = await axios.put(`${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`, data)
    
    return res.data;
  } catch (e) {
    console.log(e, 'err', JSON.stringify(e))
    return e
  }
}

/**
 * Makes a post request to the server
 * 
 * @param path 
 *      suffix to endpoint
 * @param data 
 *      data to pass in as a parameter
 * @returns 
 *      data retrieved from the server
 */
export async function post(path, data) {
  try {
    if(debug) console.log(`post: ${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`)
    let res = await axios.post(`${ENDPOINT}${path.replace(':uid', firebase.auth().currentUser.uid)}`, data)
    
    return res.data;
  } catch (e) {
    console.log(e, 'err', JSON.stringify(e))
    return e
  }
}

