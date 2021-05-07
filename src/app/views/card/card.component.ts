import { Component, OnInit } from '@angular/core';
import { Temperatura } from 'src/app/model/temperatura.dto';
import { Tempo } from 'src/app/model/tempo.dto';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public climaService : ClimaService) { }

  cidade : String;
  temperatura : Temperatura;
  tempo : Tempo;

  //Assim que o aplicativo inicia ele faz a consulta na API
  //Ainda sendo implementado
  ngOnInit(): void {
    this.climaService.findbyName('CampoGrande').subscribe(response => {
      this.cidade = response['name'];
      this.temperatura = response['main'];
      console.log(response)
    });
  }

}
