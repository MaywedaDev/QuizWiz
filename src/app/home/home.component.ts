import { Component, OnInit, Input } from '@angular/core';
import { QuizzesService } from '../../resources/quizzes.service';
import { Router } from '@angular/router'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 title = 'QuizWiz'
 quizLength: number | undefined
 faIcons = {
  faEnvelope, faTwitter, faGithub, faFacebook
 }

  constructor(private quizzesService: QuizzesService, private router: Router) {
   }

  ngOnInit(): void {
    this.quizzesService.getTests().subscribe((data: any) => {
      this.quizLength = data.tests.length;
    })
  }

  goToTests(){
    this.router.navigate(['catalogue'])
  }

}
