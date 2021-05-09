import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Capitais } from 'src/app/model/capitais.arr';
import { eventEmitter } from 'src/app/services/eventEmitter.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public emitter : eventEmitter) { }

  queryField = new FormControl();
  capitais : String [] = Capitais;
  sugestoes : String [];


  ngOnInit(): void {
  }

  search() {
    if(this.queryField.value.length != null) {
        this.emitter.emit(this.queryField.value.replace(/\s+/g, '+'));
    }
  }

}
