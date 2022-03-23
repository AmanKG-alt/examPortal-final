import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) {
  }

  public getQuestionsOfQuiz(qid:any){

    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }


  public getQuestionsOfQuizForUser(qid:any){

    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //deleteQuestion
  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`,quesId);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get qustionBy questionId
  public getQuestionByQuesId(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
