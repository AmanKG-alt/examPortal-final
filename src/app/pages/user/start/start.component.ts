import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  timer:any;


  constructor(private _locationStr:LocationStrategy, private _route:ActivatedRoute, private _ques:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params.qid;
   // console.log(this.qid);
    this.loadQuestions();
  
   
  }


  loadQuestions(){
    this._ques.getQuestionsOfQuizForUser(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;
     //  console.log(this.questions);

     this.timer=this.questions.length*2*60;

        console.log(this.questions);

        this.startTimer();
        
      },
      (error)=>{
        Swal.fire('error','error in loading questions','error');
        console.log(error);
        
      }
    );
  }

  submitQuiz(){

    Swal.fire({
      title:'Do you want to submit the quiz',
      showCancelButton:true,
      confirmButtonText:'submit',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation

      this.evalQuiz();
        // console.log('Correct Answer : ' +this.correctAnswers);
        // console.log('Marks got : ' +this.marksGot);
        // console.log('attemted : ' +this.attempted);
        
        // console.log(this.questions);
        
        
        
      }
    });
  }

  preventBackButton(){
    history.pushState(null, "", location.href);
    this._locationStr.onPopState(()=>{
      history.pushState(null, "", location.href);
    })
  }


  startTimer(){
    let t=window.setInterval(()=>{
      //code 
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }


  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer - mm*60;

    return `${mm} min: ${ss} sec`;
  }



  evalQuiz(){
    

    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswers++
    //   let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
    //   this.marksGot+=marksSingle;
    //   }

    //   if(q.givenAnswer.trim() !=''){
    //     this.attempted++;
    //   }
    // });
   
    
    this._ques.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(this.questions);
      this.isSubmit=true;
      
      
      this.correctAnswers=data.correctAnswer;
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.attempted=data.attempted;
    },
    (error)=>{
      console.log(error);
      
    });
   }


   printPage(){
     window.print();
   }
  }



