import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuizzesService } from '../../resources/quizzes.service';
import { faExclamation, faCheck, faCancel, faClock } from '@fortawesome/free-solid-svg-icons';
import { Subject, interval, Observable, Subscription} from 'rxjs'

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit, OnDestroy {
  name: any
  limit: any
  state: string = 'Pending'
  currentQuestion: number = 0
  quizQuestions: Question[] = []
  displayedQuestion: Question | undefined;
  questionsPassed: number = 0
  quizResult = {msg: '', status: '', passed: false}
  score: number = 0
  errorMsg : string | undefined
  quizName: string = ''
  quizTime: number = 0
  displayedTime: TimeSpan = {
    seconds: 0,
    minutes: 0
  }
  remainingTime: TimeSpan = {
      seconds: 0,
      minutes: 0
  }

  $timer: Subscription = Subscription.EMPTY;

  interval: any;
  faIcons = {
    faExclamation, faCheck, faCancel, faClock
  }

  constructor(private route: ActivatedRoute, public quizService: QuizzesService, private router: Router, private changeDectector: ChangeDetectorRef) {
    this.name = route.snapshot.params['id']
    this.limit = route.snapshot.queryParamMap.get('limit')
    if(!isNaN(this.limit) && this.limit <= 50){
      this.quizTime = this.limit * 45
    }
    else{
      this.quizTime = 50 * 45 
    }
   }

  ngOnInit(): void {
    // console.log(this.quizTime)
    this.displayedTime = this.getTime(this.quizTime)
    // console.log(this.displayedTime)

    
    this.quizService.getQuizzes(this.name, this.limit).subscribe((res: any) => {
      if(Array.isArray(res)){
        this.quizQuestions = this.setQuestions([...res])
        // console.log(this.quizQuestions)
      }
      // console.log(this.quizQuestions[this.currentQuestion])
    },
    (error: any) => {
      console.error('error caught in component'); 
      this.errorMsg = error.message;
      // console.log(error)
    }
    )
    this.quizName = this.name.replace(/_/g, " ")
    // console.log(this.limit)


    
  }

  ngOnDestroy(): void {
    this.$timer.unsubscribe()
    // console.log("destroyed")
  }


  startQuiz(){
    this.setQuestion()
    this.state = "Started"
    this.$timer = interval(1000).subscribe((number) => {
      if(number >= this.quizTime){
        this.quizSubmit()
      }
      this.remainingTime = this.getRemainingTime(number)
      // console.log(this.remainingTime);
    })
    
  }

  setQuestion(index: number | undefined = undefined){
    if(index || index === 0){
      this.currentQuestion = index
    }
    this.displayedQuestion = this.quizQuestions[this.currentQuestion]
  }

  parseData(questionData: any): Question{
    let correctIndex = Math.floor(Math.random() * 4)

    let { question, incorrectAnswers, correctAnswer } = questionData

    let options = incorrectAnswers.map((question: string) => question)

    options.splice(correctIndex, 0, correctAnswer)

    return {question, options, correctIndex, selectedIndex: null}

  }

  setQuestions(data: any[]): Question[] {
    return (data.map(question => this.parseData(question)))
  }

  noOfAttemptedQuestion(): number {
    return this.quizQuestions.reduce((total, val) => val.selectedIndex !== null ? total + 1 : total, 0)
  }

  prev(){
    if(this.currentQuestion > 0){
      this.currentQuestion -= 1
      this.setQuestion()
    }
  }

  next(){
    if(this.currentQuestion < this.quizQuestions.length - 1){
      this.currentQuestion += 1
      this.setQuestion()
    }
  }

  endQuiz(){
    let attemptedQuestions = this.noOfAttemptedQuestion()

    if( attemptedQuestions > 0){
      this.quizSubmit()
    }
    else{
      alert('Answer at least one question!!')
    }

    // console.log(attemptedQuestions)
  }

  quizSubmit(){
    this.state = 'Ended'
    this.questionsPassed = this.quizQuestions.reduce((total, val) => (val.selectedIndex === val.correctIndex ? total + 1 : total), 0)
    
    if ((this.questionsPassed / this.quizQuestions.length ) * 100 > 60){
      this.quizResult = {msg: 'Congratulations, You passed', status: `You have passed the ${this.name} quiz`, passed: true}
    }
    else{
      this.quizResult = {msg: 'Better luck next time', status: `You didn't pass the ${this.name} quiz`, passed: false}
    }

    this.$timer.unsubscribe()

  }

  back(){
    this.router.navigate(['catalogue'])
  }

  getRemainingTime(time: number): TimeSpan{
    let timeLeft = this.getTime(this.quizTime - time)
    let {minutes, seconds} = timeLeft

    return{
      minutes,
      seconds
    }
  }

  getTime(time: number){
    let totalSeconds = time
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 60){
      minutes = Math.floor(totalSeconds / 60)
      totalSeconds -= 60 * minutes
    }

    seconds = totalSeconds
    return{
      minutes,
      seconds
    }
  }
    

}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  selectedIndex: null|number
}


interface TimeSpan{
  minutes: number;
  seconds: number;
}


