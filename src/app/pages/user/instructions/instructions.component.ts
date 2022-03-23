import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any=[];

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _router:Router) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params.qid;
   // console.log(this.qid);

   this._quiz.getQuiz(this.qid).subscribe(
     (data)=>{
       this.quiz=data;
    //   console.log(this.quiz);
     },
     (error)=>{
       console.log(error);
       Swal.fire('error','error in loading quiz','error');

     }
   );

    
  }

  onStart(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Start',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Canceled', '', 'info')
      }
    })
  }

}
