import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://cv-processing-api.herokuapp.com/v1/doc';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  getData() {
    //console.log('executed service')
    return axios.get(`${API_URL}`,
        //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
    );
}
}
