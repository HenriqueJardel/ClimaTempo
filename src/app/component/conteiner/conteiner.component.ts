import { Component, OnInit } from '@angular/core';
import { Temperatura } from 'src/app/model/temperatura.dto';
import { Vento } from 'src/app/model/vento.dto';
import { ClimaService } from 'src/app/services/clima.service';
import { eventEmitter } from 'src/app/services/eventEmitter.service';

@Component({
  selector: 'app-conteiner',
  templateUrl: './conteiner.component.html',
  styleUrls: ['./conteiner.component.css']
})

export class ConteinerComponent implements OnInit {

  constructor(public climaService : ClimaService , public emitter : eventEmitter) {}

  cidade : String;
  tempo : String;
  temperatura : Temperatura;
  vento : Vento;

  hora: number;
  minutos : number;
  
  sunrise: number;
  sunset : number;
  nasceHora : number;
  nasceMinuto : number;
  sePoeHora : number;
  sePoeMinuto : number;
  periodo : number;
  
  ngOnInit(): void {
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
          this.climaService.findbyCoordinates(pos.coords.latitude, pos.coords.longitude).subscribe(response => {
          this.cidade = response['name'];
          this.temperatura = response['main'];
          this.vento = response['wind'];
          this.tempo = response.weather[0].description;
          this.sunrise = response['sys'].sunrise;
          this.sunset = response['sys'].sunset;
          
          let solNasce = new Date(this.sunrise * 1000);
          this.nasceHora = solNasce.getHours();
          this.nasceMinuto = solNasce.getMinutes();

          let anoitecer = new Date(this.sunset * 1000);
          this.sePoeHora = anoitecer.getHours();
          this.sePoeMinuto = anoitecer.getMinutes();

          this.setEnable(1);
        });
      }, error => {
          if(error.code) {
            this.setEnable(0);
          }
      });
    }
    
    
    this.emitter.emitEvent.subscribe(response => {
      this.climaService.findbyName(response).subscribe(response => {
        this.cidade = response['name'];
        this.temperatura = response['main'];
        this.tempo = response.weather[0].description;
        this.vento = response['wind'];
        this.sunrise = response['sys'].sunrise;
        this.sunset = response['sys'].sunset;

        let date = new Date();
        this.hora = date.getHours();
        this.minutos = date.getMinutes();

        let solNasce = new Date(this.sunrise * 1000);
        this.nasceHora = solNasce.getHours();
        this.nasceMinuto = solNasce.getMinutes();

        let anoitecer = new Date(this.sunset * 1000);
        this.sePoeHora = anoitecer.getHours();
        this.sePoeMinuto = anoitecer.getMinutes();

        this.setEnable(1);
      },error => {
          this.setEnable(0);
      })
    });

    let date = new Date();
    this.hora = date.getHours();
    this.minutos = date.getMinutes();

    this.periodo = (this.hora) < 18 ? 0 : 1;
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

  getImageSrc() {
    if(this.periodo === 0) {
      return "assets/icons/icons_temps/" + this.tempo + ".png"
    }
    else {
      return "assets/icons/icons_temps/" + this.tempo + "-noite.png"
    }
  }

  toInt(num : number) {
    if (num != undefined) {
        return Math.floor(num);
    }
  }
}
