import { Component, Input, ElementRef, DoCheck, ViewChild } from '@angular/core';
import { EngineService } from './engine.service';
import { Part } from '../configuration';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent {
  @Input() parts: Part[];
  @Input() codes: string[];
  @Input() type: string;

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService) { }

  // Update Shape Codes following code or type changes
  ngDoCheck() {
    this.updateEngine();
  }

  updateEngine() {
    this.engServ.createScene(this.rendererCanvas, this.parts, this.codes, this.type);
    this.engServ.animate();
  }

}
