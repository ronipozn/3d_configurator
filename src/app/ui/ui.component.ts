import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Configuration } from '../configuration';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: []
})
export class UiComponent implements OnInit {
  @Input() configuration: Configuration;
  @Output() updateModel: EventEmitter <{codes: string[], type: string}> = new EventEmitter();

  streamRetreived = false;

  partsSelected: boolean[];
  partsCode: string[] = [];

  constructor() { }

  ngOnInit() {
    this.partsSelected = new Array(this.configuration.parts.length).fill(false);
    this.partsCode = new Array(this.configuration.parts.length).fill(this.configuration.configurationInputs[0].values[0].code);
  }

  updateConfiguration(type: string, code: string) {
    // update configruation base on chosen configurationInput type
    if (type=='color') {
      this.partsSelected.forEach((partSelected, index) => {
        if (partSelected) this.partsCode[index] = code;
      });
      this.updateModel.emit({codes: this.partsCode, type: type});
    }
  }

}
