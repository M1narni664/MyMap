import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  mapView!: MapView | any;
  userLocationGraphic: Graphic | any;

  constructor() { }

  async ngOnInit() {
    const map = new Map({
      basemap: "topo-vector"
    });

    this.mapView = new MapView({
      container: "container",
      map: map,
      zoom: 8
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    map.add(weatherServiceFL);

    await this.updateUserLocationOnMap();
    this.mapView.center = this.userLocationGraphic.geometry as Point;
    setInterval(this.updateUserLocationOnMap.bind(this), 10000);
  }
  async getLocationService(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude]);
      })
    })
  }

  async updateUserLocationOnMap() {
    let latLng = await this.getLocationService();
    let geom = new Point({ latitude: latLng[0], longitude: latLng[1] });
    if (this.userLocationGraphic) {
      this.userLocationGraphic.geometry = geom;
    } else {
      this.userLocationGraphic = new Graphic({
        symbol: new SimpleMarkerSymbol(),
        geometry: geom,
      });
    }
    this.mapView.graphics.add(this.userLocationGraphic);
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer'

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
