import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit() {
    // Get the user's current location
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Create the map
    const map = new Map({
      basemap: 'topo-vector'
    });

    // Create the view
    const view = new MapView({
      container: 'container',
      map: map,
      zoom: 15, // Zoom level
      center: [this.longitude, this.latitude], // Center the map at user's location
    });

    // Create a point geometry for the marker
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    // Create a simple marker symbol
    const markerSymbol = {
      type: 'simple-marker',
      style: 'diamond',
      color: 'white',
      size: 15,
      outline: {
        color: 'green',
        width: 4
      }
    };

    // Create the graphic for the marker
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Add the marker to the map view
    view.graphics.add(pointGraphic);
  }
}
