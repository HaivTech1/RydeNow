import axios from 'axios';
import {BASE_URL} from '@env'

const base = "https://c272-197-210-28-138.eu.ngrok.io/api/v1"

const Client = axios.create({
  baseURL: base,
});



export default Client;
