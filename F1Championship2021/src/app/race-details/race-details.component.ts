import { Component, OnInit } from '@angular/core';
import { IPilot } from '../interfaces/ipilot';
import { SharingService } from '../services/sharing.service';
import data from '../../assets/data.json';


@Component({
  selector: 'app-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css']
})
export class RaceDetailsComponent implements OnInit {

  constructor(private sharingService : SharingService) { }
  raceNameShared: string;
  raceNameShare: string;

  arrayJson: any;
  racesDetails: any;
  jsonData: any = data;
  races:[];

  pilots : IPilot[]=[
    {
      _id: "",
      picture: "",
      age: 0,
      name: "",
      team: "",
      races: "",
    }
  ];
  ngOnInit(): void {
    this.sharingService.currentData.subscribe(data => {
      this.raceNameShared = data["name"];
    });
    //Pasamos la información del JSON a una array donde poder trabajar
    this.arrayJson = Object.entries(this.jsonData)

    let pasarDatos = this.arrayJson[0];
    pasarDatos.forEach(element => {
      // console.log(element);

      this.pilots = element;
    });

    //Recogemos las carreras de un piloto para acceder al nombre de todas
    this.racesDetails = this.pilots[0].races
    console.log("Miramos los pilotos",this.racesDetails);

    this.orderPilots();
  }
  orderPilots(){
    this.pilots.forEach(pilot =>{
      this.pilots.sort((a,b)=>{

        let aRaces = a.races;
        let bRaces = b.races;
        let aData;
        let aSeconds;
        let bSeconds;

        aRaces.forEach(aRace => {
            if(aRace["name"] === this.raceNameShared){
              let data: any = aRace["time"].split(":",3);
              let hours = parseInt(data[0]) * 3600;
              let minutes = parseInt(data[1]) * 60;
              let seconds = parseFloat(data[2]);

              aSeconds = hours + minutes + seconds;
            }
            return aSeconds
         });
         bRaces.forEach(bRace => {
          if(bRace["name"] === this.raceNameShared){
            let data: any = bRace["time"].split(":",3);
            let hours = parseInt(data[0]) * 3600;
            let minutes = parseInt(data[1]) * 60;
            let seconds = parseFloat(data[2]);

            bSeconds = hours + minutes + seconds;
          }
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
    this.raceNameShared = race["name"];
    this.orderPilots();
  }
  pasarInfoDetailsPiloto(piloto){
    this.sharingService.setData(piloto);
    console.log("hola", piloto);
  }
}
