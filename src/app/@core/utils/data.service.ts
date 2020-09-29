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

  public uploadFile(formData) {
    return this.http.post<any>("http://localhost:8080/uploadprofile", formData, {
        reportProgress: true,
        observe: 'events'
      });
  }


  getExperienceOfCandidateFromSubtechnology(subTechName){
    console.log("data service method")
    return this.http.get(`${API_URL}/getExperienceOfCandiatesFromSubtechnology/${subTechName}`)
  }

  getExperiece(){
    return axios.get(`${API_URL1}/experienceofcandidate`,)
  }

  getTechnologyExperience(Technology){
    return this.http.get(`${API_URL1}/experience/${Technology}/`,)
  }

  getVacancyChartData(){
    return axios.get(`${API_URL1}/monthvacancy`,)
  }
  getProjectVacancyChartData(){
    return axios.get(`${API_URL1}/projectvacancy`,)
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
  getCandidateById(id)
{
  return this.http.get(`${API_URL}/candidiate/${id}`);

}
    getSubTechnologyData(id)
    {
      return axios.get(`${API_URL}/subtechnology/technology/${id}/`,);
    }

    getAllSubTechnologyData(){
      return axios.get(`${API_URL}/subtechnology`);
    }

    getVacancyData() {
      return axios.get(`${API_URL}/vacancy?sort=available`,);
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
      return this.http.delete(`https://authentication-api-cv.herokuapp.com/api/profileDelete/${userId}`)
    }
    getLevelData(){
       return this.http.get(`https://cv-processing-api.herokuapp.com/api/getListOfLevels`)

    }
    addMultipleResume(vacancyId,listOfFiles)
    {
      // return axios.post(`https://application-form-processing.herokuapp.com/uploadmultipleprofiles/`,listOfFiles)
      return axios.post(`https://localhost:8080/uploadmultipleprofiles/`,listOfFiles)

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
      return this.http.post(`https://cv-processing-api.herokuapp.com/api/addLevel`,level);
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
    getInterviewByInterviewId(id)
    {
      return this.http.get(`https://cv-processing-api.herokuapp.com/interview/${id}`)
    }

    DeteteInterview(id)
    {
      //return axios.delete(`http://localhost:8080/deleteMeeting/${id}`);
      return axios.delete(`https://cv-processing-api.herokuapp.com/deleteMeeting/${id}`);
    }

    rescheduledMeeting(obj,reason)
  {
    return axios.post(`https://cv-processing-api.herokuapp.com/rescheduledMeeting?reason=${reason}`,obj);
    //return axios.post(`http://localhost:8080/rescheduledMeeting?reason=${reason}`,obj);
  }
  getVacancyById(vacancyId){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/vacancy/${vacancyId}`)
  }

  getTechnologyForPanel(list)
  {
    return axios.get(`https://cv-processing-api.herokuapp.com/v1/getTechnologyFromSubtechnology//${list}`);
  }
  getTechnologyById(id)
  {
    return axios.get(`https://cv-processing-api.herokuapp.com/v1/technology/${id}`);

  }
  getConceptById(name)
  {
    return this.http.get(` https://cv-processing-api.herokuapp.com/api/getAllConcept/${name}`);

  }

  getAllConfirmedScheduledInterview(){
    return this.http.get("https://cv-processing-api.herokuapp.com/interview/confirmed")
  }

  getAllProject(){
    return this.http.get("https://cv-processing-api.herokuapp.com/v1/project")
  }

  getAllPositions(){
    return this.http.get("https://cv-processing-api.herokuapp.com/v1/position")
  }

  getAllCandidate() {
    return this.http.get("https://cv-processing-api.herokuapp.com/v1/candidiate")
  }

  getCountOfCandidateByProjectName(projectName){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getCountOfCandidateByProjectAndVacancy/${projectName}`);

  }
  createEvaluationReport(evalObj)
  {
    return this.http.post("https://cv-processing-api.herokuapp.com/v1/evaluation",evalObj);
  }

  getEvaluationBycandidateId(id)
  {
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/GetEvaluationReportByCandidateId/${id}`);
  }

  postOnFb(vacancy){
        //return this.http.post("https://localhost:3000/post-fb",vacancy);
      return this.http.post("https://social-fb-app.herokuapp.com/post-fb",vacancy);
  }

  getCandidateByProjectName(projName){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getCandidateByProject/${projName}`);
  }

  getAllApplicationInMonth(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/monthapplication`);
  }

  getCountOfApplicationForProject(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getCountOfApplicationForProject`);
  }

  getCountOfVacancyForProject(str){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getCountOfVacancyForProject/${str}`);
  }

  getCountOfSelectedForProject(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getCountOfSelectedForProject`);
  }

  getNumberOfRejectedMonthly(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getNumberOfRejectedMonthly`);
  }

  getSelectedMonthly(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getSelectedMonthly`);
  }

  getTotalInterviewMonthly(){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getTotalInterviewMonthly`);
  }


  createNewCandidate(candidateDummy)
    {
      return this.http.post(`http://localhost:8080/v1/createNewCandidate`,candidateDummy);
    }

  getQuestionsForHr()
  {
    let pathVar = "Soft Skill"
    return this.http.get(`https://cv-processing-api.herokuapp.com/api/getAllConcept/${pathVar}`);
  }

  getVacancyByProjectAndPosition(projectName, positionName){
    return this.http.get(`https://cv-processing-api.herokuapp.com/v1/getVacancyByProjectAndPosition/${projectName}/${positionName}`)
  }
}
