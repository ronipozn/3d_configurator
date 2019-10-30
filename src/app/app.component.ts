import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { Configuration } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = '3D Configurator';
  streamRetreived = false;

  configuration: Configuration;

  codes: string[];
  type: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    // dummy API request for a configuration
    this.api.getConfiguration()
      .subscribe((res: any) => {
        this.configuration = res;
        this.codes = new Array(this.configuration.parts.length).fill(this.configuration.configurationInputs[0].values[0].code);
        console.log(this.configuration);
        this.streamRetreived = true;
      }, err => {
        console.log(err);
        this.streamRetreived = true;
      });
  }

  updateEngine(event) {
    // update event type and selecte code from the user UI
    this.codes = event.codes;
    this.type = event.type;
  }

}
