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
      return axios.get(`${API_URL}/subtechnology/technology/${id}/`,);
    }

    getVacancyData() {
      return axios.get(`${API_URL}/vacancy?sort=avalible`,);
    }

    DeteteVacancy(id) {
      return axios.delete(`${API_URL}/vacancy/${id}`,);
    }

    addVacancy(vacancy) {
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

    updateCandidate(data,vid)
    {
      console.log(data)
      return axios.put(`${API_URL}/candidate/update/${vid}`,data)
    }

    DeteteCandidate(id) {
      return axios.delete(`${API_URL}/candidiate/${id}`,);
    }
    getUserDetails(userId)
    {
      return this.http.get(`https://authentication-api-cv.herokuapp.com/api/user/${userId}`)
    }
    getGUserDetails(userName)
    {
      return this.http.get(`https://authentication-api-cv.herokuapp.com/gapi/user/${userName}`)
    }

     addOrEditProfile(profObj, userId)
    {
      return this.http.put(`https://authentication-api-cv.herokuapp.com/api/profile/${userId}`, profObj)
    }
    gaddOrEditProfile(profObj, userId)
    {
      return this.http.put(`https://authentication-api-cv.herokuapp.com/gapi/profile/${userId}`, profObj)
    }
    getListOfUsers()
    {
      return this.http.get(`https://authentication-api-cv.herokuapp.com/api/user/`)
    }

    editProfilePhoto(profObj, userId)
    {
      return this.http.put(`https://authentication-api-cv.herokuapp.com/api/upload/${userId}`, profObj)
    }
    getUserProfilePhoto(profId)
    {
      return axios.get(`https://authentication-api-cv.herokuapp.com/api/image/${profId}`)
    }

    getFeatureByRole(name:any)
    {
      return axios.get(`${API_URL}/feature/${name}`);
    }
    getListOfAllRoles()
    {
      return this.http.get(`https://authentication-api-cv.herokuapp.com/api/roles`)
    }
    setRole(userId, roleObj)
    {
      return this.http.post(`https://authentication-api-cv.herokuapp.com/api/set-role/${userId}`, roleObj)
    }

    deleteUser(userId)
    {
      return this.http.delete(`http://localhost:8080/api/profileDelete/${userId}`)
    }
    getLevelData(){
       return this.http.get(`http://localhost:8081/api/getListOfLevels`)

    }
    addMultipleResume(vacancyId,listOfFiles)
    {
      return axios.put(`${API_URL}/${vacancyId}`,listOfFiles)
    }
    getAllhr()
    {
      return this.http.get("https://authentication-api-cv.herokuapp.com/api/get-all-users/hr")
    }
    getAllPanel()
    {
      return this.http.get("https://authentication-api-cv.herokuapp.com/api/get-all-users/panel")

    }
    addLevelData(level)
    {
      return this.http.post(`http://localhost:8081/api/addLevel`,level);
    }
    
    setMeeting(obj:any)
    {
      //return axios.post(`http://localhost:8080/setMeeting`,obj);
      return axios.post(`https://cv-processing-api.herokuapp.com/setMeeting`,obj);
    }

    getListOfInterview()
    {
      //return axios.get(`http://localhost:8080/interview`);
      return axios.get(`https://cv-processing-api.herokuapp.com/interview`);
      
    }

    DeteteInterview(id)
    {
      //return axios.delete(`http://localhost:8080/deleteMeeting/${id}`);
      return axios.delete(`https://cv-processing-api.herokuapp.com/deleteMeeting/${id}`);
    }
}
