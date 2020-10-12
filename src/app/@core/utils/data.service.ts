import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';


//http://authentication-api-cv.herokuapp.com/api/user/10
//const API_URL = "http://localhost:8080/v1";
 const API_URL = "https://cv-processing-api.herokuapp.com/v1"
//const AUTH_API_URL = "http://localhost:8880"
const AUTH_API_URL = "https://authentication-api-cv.herokuapp.com"
// const AUTH_API_URL = "http://localhost:8080/login/google"



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
    return this.http.post<any>("https://application-form-processing.herokuapp.com/uploadprofile", formData, {
        reportProgress: true,
        observe: 'events'
      });
  }


  getExperienceOfCandidateFromSubtechnology(subTechName){
    console.log("data service method")
    return this.http.get(`${API_URL}/getExperienceOfCandiatesFromSubtechnology/${subTechName}`)
  }

  getExperiece(){
    return axios.get(`${API_URL}/experienceofcandidate`,)
  }

  getTechnologyExperience(Technology){
    return this.http.get(`${API_URL}/experience/${Technology}/`,)
  }

  getVacancyChartData(){
    return axios.get(`${API_URL}/monthvacancy`,)
  }
  getProjectVacancyChartData(){
    return axios.get(`${API_URL}/projectvacancy`,)
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
      return this.http.get(`${AUTH_API_URL}/api/user/${userId}`)
    }
    getGUserDetails(userName)
    {
      return this.http.get(`${AUTH_API_URL}/gapi/user/${userName}`)
    }

     addOrEditProfile(profObj, userId)
    {
      return this.http.put(`${AUTH_API_URL}/api/profile/${userId}`, profObj)
    }
    gaddOrEditProfile(profObj, userId)
    {
      return this.http.put(`${AUTH_API_URL}/gapi/profile/${userId}`, profObj)
    }
    getListOfUsers()
    {
      return this.http.get(`${AUTH_API_URL}/api/user/`)
    }

    editProfilePhoto(profObj, userId)
    {
      return this.http.put(`${AUTH_API_URL}/api/upload/${userId}`, profObj)
    }
    getUserProfilePhoto(profId)
    {
      return axios.get(`${AUTH_API_URL}/api/image/${profId}`)
    }

    getFeatureByRole(name:any)
    {
      return axios.get(`${API_URL}/feature/${name}`);
    }
    getListOfAllRoles()
    {
      return this.http.get(`${AUTH_API_URL}/api/roles`)
    }
    setRole(userId, roleObj)
    {
      return this.http.post(`${AUTH_API_URL}/api/set-role/${userId}`, roleObj)
    }

    deleteUser(userId)
    {
      return this.http.delete(`${AUTH_API_URL}/api/profileDelete/${userId}`)
    }
    getLevelData(){
       return this.http.get(`${API_URL}/getListOfLevels`)

    }
    addMultipleResume(vacancyId,listOfFiles)
    {
      // return axios.post(`https://application-form-processing.herokuapp.com/uploadmultipleprofiles/`,listOfFiles)
      return axios.post(`${API_URL}/uploadmultipleprofiles/`,listOfFiles)

    }

    getAllhr()
    {
      return this.http.get(`${AUTH_API_URL}/api/get-all-users/hr`)
    }
    getAllPanel()
    {
      return this.http.get(`${AUTH_API_URL}/api/get-all-users/panel`)

    }
    addLevelData(level)
    {
      return this.http.post(`${API_URL}/addLevel`,level);
    }

    setMeeting(obj:any)
    {
      //return axios.post(`http://localhost:8080/setMeeting`,obj);
      return axios.post(`http://localhost:8080/setMeeting`,obj);
    }

    getListOfInterview()
    {
      //return axios.get(`http://localhost:8080/interview`);
      return axios.get(`http://localhost:8080/interview`);

    }
    getInterviewByInterviewId(id)
    {
      return this.http.get(`http://localhost:8080/interview/${id}`)
    }

    DeteteInterview(id)
    {
      //return axios.delete(`http://localhost:8080/deleteMeeting/${id}`);
      return axios.delete(`http://localhost:8080/deleteMeeting/${id}`);
    }

    rescheduledMeeting(obj,reason)
  {
    return axios.post(`http://localhost:8080/rescheduledMeeting?reason=${reason}`,obj);
    //return axios.post(`http://localhost:8080/rescheduledMeeting?reason=${reason}`,obj);
  }
  getVacancyById(vacancyId){
    return this.http.get(`${API_URL}/vacancy/${vacancyId}`)
  }

  getTechnologyForPanel(list)
  {
    return axios.get(`${API_URL}/getTechnologyFromSubtechnology//${list}`);
  }
  getTechnologyById(id)
  {
    return axios.get(`${API_URL}/technology/${id}`);

  }
  getConceptById(name)
  {
    return this.http.get(` ${API_URL}/getAllConcept/${name}`);

  }

  getAllConfirmedScheduledInterview(){
    return this.http.get(`http://localhost:8080/interview/confirmed`)
  }

  getAllProject(){
    return this.http.get(`${API_URL}/project`)
  }

  getAllPositions(){
    return this.http.get(`${API_URL}/position`)
  }

  getAllCandidate() {
    return this.http.get(`${API_URL}/candidiate`)
  }

  getCountOfCandidateByProjectName(projectName){
    return this.http.get(`${API_URL}/getCountOfCandidateByProjectAndVacancy/${projectName}`);

  }
  createEvaluationReport(evalObj)
  {
    return this.http.post(`${API_URL}/evaluation`,evalObj);
  }

  getEvaluationBycandidateId(id)
  {
    return this.http.get(`${API_URL}/GetEvaluationReportByCandidateId/${id}`);
  }

  postOnFb(vacancy){
        //return this.http.post("https://localhost:3000/post-fb",vacancy);
      return this.http.post("https://social-fb-app.herokuapp.com/post-fb",vacancy);
  }

  getCandidateByProjectName(projName){
    return this.http.get(`${API_URL}/getCandidateByProject/${projName}`);
  }

  getAllApplicationInMonth(){
    return this.http.get(`${API_URL}/monthapplication`);
  }

  getCountOfApplicationForProject(){
    return this.http.get(`${API_URL}/getCountOfApplicationForProject`);
  }

  getCountOfVacancyForProject(str){
    return this.http.get(`${API_URL}/getCountOfVacancyForProject/${str}`);
  }

  getCountOfSelectedForProject(){
    return this.http.get(`${API_URL}/getCountOfSelectedForProject`);
  }

  getNumberOfRejectedMonthly(){
    return this.http.get(`${API_URL}/getNumberOfRejectedMonthly`);
  }

  getSelectedMonthly(){
    return this.http.get(`${API_URL}/getSelectedMonthly`);
  }

  getTotalInterviewMonthly(){
    return this.http.get(`${API_URL}/getTotalInterviewMonthly`);
  }


  createNewCandidate(candidateDummy)
    {
      return this.http.post(`${API_URL}/createNewCandidate`,candidateDummy);
    }

  getQuestionsForHr()
  {
    let pathVar = "Soft Skill"
    return this.http.get(`${API_URL}/getAllConcept/${pathVar}`);
  }

  getVacancyByProjectAndPosition(projectName, positionName){
    return this.http.get(`${API_URL}/getVacancyByProjectAndPosition/${projectName}/${positionName}`)
  }
}
