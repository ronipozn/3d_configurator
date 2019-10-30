import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Part } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private mesh: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>, parts: Part[], codes: string[], type: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.5, 1000
    );
    this.camera.position.z = 500;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.z = 50;
    this.scene.add(this.light);

    //
    var xOffset = -200;

    // loop over all parts
    parts.forEach((part, index) => {

      // update Colors for all parts
      var material = new THREE.MeshBasicMaterial({color: ('#'+codes[index])});

      // build the selected geometry
      switch (part.geometry) {
        case 'sphere': {
          var geometrySphere = new THREE.SphereGeometry(part.parameters.radius);
          this.mesh = new THREE.Mesh( geometrySphere, material );
          break;
        }
        case 'cube': {
          var geometryCube = new THREE.BoxGeometry(part.parameters.height, part.parameters.height, part.parameters.height);
          this.mesh = new THREE.Mesh( geometryCube, material );
          break;
        }
        case 'cylinder': {
          var geometryCylinder = new THREE.CylinderGeometry(part.parameters.radius, part.parameters.radius, part.parameters.height);
          this.mesh = new THREE.Mesh( geometryCylinder, material );
          break;
        }
      }
      this.mesh.position.x = xOffset + index*200;
      this.scene.add(this.mesh);
    });

  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
    });
  }

  render() {
    this.frameId = requestAnimationFrame(() => { this.render(); });
    this.renderer.render(this.scene, this.camera);
  }
}
