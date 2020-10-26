import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-lazy',
  templateUrl: './no-lazy.component.html',
  styleUrls: ['./no-lazy.component.css']
})
export class NoLazyComponent implements OnInit {
  @Input() num;

  constructor() { }

  ngOnInit(): void {
  }

}
