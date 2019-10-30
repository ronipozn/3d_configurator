import { Injectable } from '@angular/core';
import { Configuration } from './configuration';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getConfiguration(): Observable<any> {
    return of(configurations[0])
  }
}

// configuration example
var configurations = [
  {
    "configurationInputs": [
      {
        "name": "Color",
        "type": "color",
        "values": [
          {
            "label": "Red",
            "code": "FF0000"
          },
          {
            "label": "Green",
            "code": "00FF00"
          },
          {
            "label": "Blue",
            "code": "0000FF"
          },
          {
            "label": "Black",
            "code": "000000"
          },
          {
            "label": "White",
            "code": "FFFFFF"
          }
        ]
      }
    ],
    "parts": [
      {
        "geometry": "sphere",
        "parameters": {
          "radius": "50"
        }
      },
      {
        "geometry": "cube",
        "parameters": {
          "height": "100"
        }
      },
      {
        "geometry": "cylinder",
        "parameters": {
          "radius": "50",
          "height": "100"
        }
      }
    ]
  }
];
