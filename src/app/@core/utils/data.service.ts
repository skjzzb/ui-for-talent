import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://cv-processing-api.herokuapp.com/v1';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  getData() {
    //console.log('executed service')
    return axios.get(`${API_URL}/doc`,
        //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
    );
  }

    getTechnologyData() {
      return axios.get(`${API_URL}/technology`,);
    }
      getSubTechnologyData()
      {
        return axios.get(`${API_URL}/subtechnology`,);
      }

}

