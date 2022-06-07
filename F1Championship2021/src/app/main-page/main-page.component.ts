import { Component, OnInit } from '@angular/core';
import data from '../../assets/data.json';
import { IPilot } from '../interfaces/ipilot';
import { IRace } from '../interfaces/irace';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharingService } from '../services/sharing.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  jsonData: any = data;
  arrayJson: any;
  racesDetails: any;
  raceNameShare: string;
  rank: number;

  pilots : IPilot[]=[
    {
      _id: "",
      picture: "",
      age: 0,
      name: "",
      team: "",
      races: ""
    }
  ];

  constructor(private sharingService : SharingService) { }

  ngOnInit(): void {
    //Pasamos la información del JSON a una array donde poder trabajar
    this.arrayJson = Object.entries(this.jsonData)

    let pasarDatos = this.arrayJson[0];
    pasarDatos.forEach(element => {
      this.pilots = element;
    });

    //Recogemos las carreras
    this.racesDetails = this.pilots[0].races
    // console.log(this.racesDetails);

  this.orderPilots();
  console.log(this.pilots);

  }
  orderPilots(){
    this.rank = 0;
    this.pilots.forEach(pilot =>{
      this.pilots.sort((a,b)=>{

        let aRaces = a.races;
        let bRaces = b.races;
        let aData;
        let aSeconds;
        let bSeconds;

        aRaces.forEach(aRace => {

              let data: any = aRace["time"].split(":",3);
              let hours = parseInt(data[0]) * 3600;
              let minutes = parseInt(data[1]) * 60;
              let seconds = parseFloat(data[2]);

              aSeconds = hours + minutes + seconds;

            return aSeconds
         });
         bRaces.forEach(bRace => {

            let data: any = bRace["time"].split(":",3);
            let hours = parseInt(data[0]) * 3600;
            let minutes = parseInt(data[1]) * 60;
            let seconds = parseFloat(data[2]);

            bSeconds = hours + minutes + seconds;

          return bSeconds
       });
        return aSeconds - bSeconds;
      })
    });
    for(let i = 0; this.pilots.length>i; i++){
      this.pilots[i].rank = i + 1
    }
  }

  pasarInfoDetailsRace(race){
    this.raceNameShare = race;
    this.sharingService.setData(this.raceNameShare);
  }
  pasarInfoDetailsPiloto(piloto){
    this.sharingService.setData(piloto);
    console.log("hola", piloto);
  }
  }


