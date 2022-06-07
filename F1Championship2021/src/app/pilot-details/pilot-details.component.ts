import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPilot } from '../interfaces/ipilot';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: ['./pilot-details.component.css']
})
export class PilotDetailsComponent implements OnInit {
  constructor(private sharingService : SharingService,
              private router : Router) { }
  pilotShared: any;
  pilotRaces: any;

  arrayJson: any;
  racesDetails: any;
  // jsonData: any = data;
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
      this.pilotShared = data;
      //Redireccionamos a main page si no hay piloto que visualizar (en caso de entrar por enlace)
      if(this.pilotShared.length == 0){
          this.router.navigate(['main-page'])
      }
    });
    //Recogemos las carreras de un piloto para acceder al nombre de todas
    this.pilotRaces = this.pilotShared.races
    console.log("Miramos las carreras",this.pilotRaces);

  }
}
