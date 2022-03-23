import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _question:QuestionService,private _snack:MatSnackBar) { }

  qId:any;
  qTitle:any;
  questions:any=[]
  ngOnInit(): void {

    this.qId=this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;
    // console.log(this.qId);
    // console.log(this.qTitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data)=>{

        this.questions=data;
        //console.log(data);
        
        
      },
      (error)=>{
      console.log(error);
      Swal.fire('Error','Error loading questions!!','error');
      
      }
    )
    
    
  }

  deleteQues(qid:any){

    Swal.fire({
      icon:'info',
      title:'Are you sure!!, want to delete this question?',
      showCancelButton:true,
      confirmButtonText:'Delete',
      timer:5000
     }).then(((result)=>{
       if(result.isConfirmed){
         this._question.deleteQuestion(qid).subscribe(
           (data)=>{

            this._snack.open('Question Deleted','',{
              duration:3000,
            });
            this.questions=this.questions.filter((q:any)=>q.quesId!=qid);
           },
           (error)=>{
             this._snack.open('Error in deleting Question','',{
               duration:3000,
             });
           }
         )
       }
     }))
  }

}
