import { Component, OnInit } from '@angular/core';
import { Temperatura } from 'src/app/model/temperatura.dto';
import { Tempo } from 'src/app/model/tempo.dto';
import { ClimaService } from 'src/app/services/clima.service';
import { eventEmitter } from 'src/app/services/eventEmitter.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public climaService : ClimaService , public emitter : eventEmitter) { }

  cidade : String;
  temperatura : Temperatura;
  tempo : Tempo;
  error : boolean = false;

  //Assim que o aplicativo inicia ele faz a consulta na API
  //Ainda sendo implementado
  //Algumas consultas ainda retornam 404 
  ngOnInit(): void {
    this.climaService.findbyName('Brasilia').subscribe(response => {
      this.cidade = response['name'];
      this.temperatura = response['main'];
      this.tempo = response['weather'];
    }, error => {
       this.error = true;
    });

    // Evento Emitido pelo header.component
    this.emitter.emitEvent.subscribe(response => {
      this.climaService.findbyName(response).subscribe(response => {
        this.cidade = response['name'];
        this.temperatura = response['main'];
        this.tempo = response['weather'];
      })
    });

  }

}
