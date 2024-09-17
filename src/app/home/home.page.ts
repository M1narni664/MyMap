import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView!: MapView;
  map!: Map;
  userLocationGraphic: Graphic | any;

  constructor() { }

  async ngOnInit() {
    this.map = new Map({
      basemap: "topo-vector"  // Default basemap
    });

    this.mapView = new MapView({
      container: "container",
      map: this.map,
      zoom: 5,
      center: [-100.93962439742758, 40.36207168925529] // Center the map on the desired location
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    this.map.add(weatherServiceFL);

    this.addMarkerAtCoordinates(39.48414730017551, -99.62792052624937);
  }

  addMarkerAtCoordinates(lat: number, lon: number) {
    const point = new Point({
      latitude: lat,
      longitude: lon
    });

    const markerSymbol = new SimpleMarkerSymbol({
      style: 'diamond',
      color: 'yellow',
      outline: {
        color: 'green',
        width: 2
      },
      size: "30px"  // Set marker size
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    this.mapView.graphics.add(pointGraphic);
  }

  onBasemapChange(event: any) {
    const selectedBasemap = event.detail.value;
    this.map.basemap = selectedBasemap;
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';

//   private latitude: number | any;
//   private longitude: number | any;

//   public async ngOnInit() {
//     // Get the user's current location
//     const position = await Geolocation.getCurrentPosition();
//     this.latitude = position.coords.latitude;
//     this.longitude = position.coords.longitude;

//     // Create the map
//     const map = new Map({
//       basemap: 'topo-vector'
//     });

//     // Create the view
//     const view = new MapView({
//       container: 'container',
//       map: map,
//       zoom: 15, // Zoom level
//       center: [this.longitude, this.latitude], // Center the map at user's location
//     });

//     // Create a point geometry for the marker
//     const point = new Point({
//       longitude: this.longitude,
//       latitude: this.latitude
//     });

//     // Create a simple marker symbol
//     const markerSymbol = {
//       type: 'simple-marker',
//       style: 'diamond',
//       color: 'white',
//       size: 15,
//       outline: {
//         color: 'green',
//         width: 4
//       }
//     };

//     // Create the graphic for the marker
//     const pointGraphic = new Graphic({
//       geometry: point,
//       symbol: markerSymbol
//     });

//     // Add the marker to the map view
//     view.graphics.add(pointGraphic);
//   }
// }
