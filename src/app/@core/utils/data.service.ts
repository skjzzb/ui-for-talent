import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';


//http://authentication-api-cv.herokuapp.com/api/user/10
const API_URL = 'https://cv-processing-api.herokuapp.com/v1';
const API_URL1 = "http://localhost:8081/v1";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  logindetails : any
  token : any
 
  constructor(private http: HttpClient) { 
    if(sessionStorage.getItem('user_info'))
    {
    this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
    this.token = this.logindetails.accessToken
    }
  }
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
      return axios.get(`${API_URL}/vacancy?sort=avalible`,);
    }

    DeteteVacancy(id) {
      return axios.delete(`${API_URL}/vacancy/${id}`,);
    }

    addVacancy(vacancy) {
      console.log(vacancy.shortSummary)
      console.log(vacancy.noOfVacancy)
      return axios.post(`${API_URL}/vacancy`,vacancy);
    }

    updateVacancy(data,vacancyId)
    {
      return axios.put(`${API_URL}/vacancy/${vacancyId}`,data)
    }

    getCandidateByVacancyId(id)
    {
      return axios.get(`${API_URL}/candidiate/vacancy/${id}`);
    }

    updateCandidate(data)
    {
      return axios.post(`${API_URL}/candidiate/update`,data)
    }

    DeteteCandidate(id) {
      return axios.delete(`${API_URL}/candidiate/${id}`,);
    }
    getUserDetails(userId)
    {
      return this.http.get(`http://authentication-api-cv.herokuapp.com/api/user/${userId}`)
    }

     addOrEditProfile(profObj, userId)
    {
      return this.http.put(`http://authentication-api-cv.herokuapp.com/api/profile/${userId}`, profObj)
    }
 
}



    

     

      


