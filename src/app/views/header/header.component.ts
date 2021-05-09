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

    //Mostra sugestoes na barra de pesquisa assim que o usuario digita alguma coisa
    this.queryField.valueChanges.subscribe(response => {
      if (this.queryField.value.length > 0) {
        this.sugestoes = this.capitais.filter(data => {
            return data.toLowerCase().startsWith(response.toLocaleLowerCase());
        });
      }
    })
  }

  // Emite um evento para o card Component atualizar a cidade 
  search() {
    if(this.queryField.value.length != null) {
        this.emitter.emit(this.queryField.value.replace(/\s+/g, '+'));
    }
  }

}
