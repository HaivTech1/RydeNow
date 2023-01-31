import axios from 'axios';
import {BASE_URL} from '@env'

const base = `${BASE_URL}/api/v1`

const Client = axios.create({
  baseURL: base,
});



export default Client;
