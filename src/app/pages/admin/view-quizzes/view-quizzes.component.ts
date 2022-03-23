import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
quizzes:any=[]
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
       console.log(error);
        Swal.fire('Error !', "Error in loading data !",'error');
      }
    )
  }

    deletequiz(id:any){
   
      Swal.fire({
        icon:'info',
        title:'Are you sure?',
        confirmButtonText:'Delete',
        showCancelButton:true,
        timer:5000,
      }).then((result)=>{
        if(result.isConfirmed){
          //delete
          this._quiz.deleteQuizz(id).subscribe((data:any)=>{
       
            Swal.fire('Success !!','Quiz is deleted successfuly','success');
            window.location.reload();
           },(error)=>{
             
                 Swal.fire('Error !', "Error in deleted data !",'error');
          
                })
        }
      })
    }
  
}
