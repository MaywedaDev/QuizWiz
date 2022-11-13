import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../../resources/quizzes.service';
import { Quiz } from '../../interfaces/quiz'
import { faCircleQuestion, faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  tests: Quiz[] | undefined
  name: string | undefined
  faIcons = {
    faCircleQuestion, faClock
  }
  errorMsg: string | undefined


  constructor(private quizzesService: QuizzesService) { }

  ngOnInit(): void {
    this.quizzesService.getTests().subscribe((response: any) => {
      this.tests = response
      this.errorMsg = undefined;
    },
    (error: any) => {
      console.error('error caught in component');
      this.tests = undefined; 
      this.errorMsg = 'There is a problem with your internet connection';
    })

    console.log(this.tests)
  }

}
