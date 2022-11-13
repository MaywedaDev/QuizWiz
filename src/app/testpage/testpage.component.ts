import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {
  name: any

  constructor(private route: ActivatedRoute) {
    this.name = route.snapshot.params['id']
   }

  ngOnInit(): void {
    

    console.log(this.name)

  }

}
