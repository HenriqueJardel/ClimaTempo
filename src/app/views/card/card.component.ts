import { Component, OnInit } from '@angular/core';
import { Temperatura } from 'src/app/model/temperatura.dto';
import { Tempo } from 'src/app/model/tempo.dto';
import { Vento } from 'src/app/model/vento.dto';
import { ClimaService } from 'src/app/services/clima.service';
import { eventEmitter } from 'src/app/services/eventEmitter.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  constructor(public climaService : ClimaService , public emitter : eventEmitter) {}

  cidade : String;
  temperatura : Temperatura;
  tempo : Tempo;
  vento : Vento;
  hora: number;
  minutos : number;
  
  ngOnInit(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
          this.climaService.findbyCoordinates(pos.coords.latitude, pos.coords.longitude).subscribe(response => {
          this.cidade = response['name'];
          this.temperatura = response['main'];
          this.vento = response['wind'];
          this.tempo = response.weather[0].description;
          this.setEnable(1);
        });
      });
    }
    else {
      this.setEnable(0);
    }
    
    this.emitter.emitEvent.subscribe(response => {
      this.climaService.findbyName(response).subscribe(response => {
        this.cidade = response['name'];
        this.temperatura = response['main'];
        this.tempo = response.weather[0].description;
        this.vento = response['wind'];

        let date = new Date();
        this.hora = date.getHours();
        this.minutos = date.getMinutes();
        this.setEnable(1);
      },error => {
        this.setEnable(0);
      })
    });

    let date = new Date();
    this.hora = date.getHours();
    this.minutos = date.getMinutes();
  }

  setEnable(num : number) {
    if (num === 1) {
      document.getElementById("noCidade").style.display = "none";
      document.getElementById("Cidade").style.display = "inline";
    }
    else {
      document.getElementById("noCidade").style.display = "inline";
      document.getElementById("Cidade").style.display = "none";
    }
  }
}
