import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://cv-processing-api.herokuapp.com/v1';
const API_URL1 = "http://localhost:8081/v1";
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
      getSubTechnologyData(id)
      {
        return axios.get(`${API_URL}/subtechnology/technology/${id}`,);
      }

      getVacancyData() {
        //http://localhost:8081/v1
        return axios.get(`${API_URL}/vacancy`,);
      }

      DeteteVacancy(id) {
        return axios.delete(`${API_URL}/vacancy/${id}`,);
      }

      addVacancy(vacancy) {
        console.log(vacancy.shortSummary)
        console.log(vacancy.noOfVacancy)
        return axios.post(`${API_URL}/vacancy`,vacancy);
      }

}