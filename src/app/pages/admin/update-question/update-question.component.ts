import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId=0;
  question:any;
  quiz:any;

  constructor(private _route:ActivatedRoute, private _ques:QuestionService) { }

  ngOnInit(): void {
    this.quesId=this._route.snapshot.params.quesid;
   // alert(this.quesId);

   this._ques.getQuestionByQuesId(this.quesId).subscribe(
     (data)=>{
       this.question=data;
     //  console.log(this.question);    
     },
     (error)=>{
      console.log(error);     
    }
   );
  }

  updateQuestion(){
    this._ques.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success','Question Updated Successfully','success');
        this.question=''
      },
      (error)=>{
        Swal.fire('error','error in updating Question','error');
      }
    )
  }
}
