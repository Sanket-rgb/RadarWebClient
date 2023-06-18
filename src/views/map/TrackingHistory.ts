import { CircleMarker, LatLng, LayerGroup, Map } from "leaflet";

class TrackingHistory {
  private map: Map;
  private historyLayer: LayerGroup;
  private trackingPoints: LatLng[][];
  private currentIndex = 0;
  public playing = true;


  constructor(map: Map, trackingPoints: LatLng[][]) {
    this.map = map;
    this.trackingPoints = trackingPoints;
    this.historyLayer = new LayerGroup();
    this.historyLayer.addTo(this.map);
    console.log("TrackingHistory inited")
    this.draw();
  }

  public updateTrackingPoints = (trackingPoints: LatLng[][]) => {
    this.currentIndex = 0;
    this.trackingPoints = trackingPoints;
    this.map.removeLayer(this.historyLayer);
  }

  private draw = () => {
    if (this.playing) {
      this.drawHistory();
      setTimeout(() => {
        this.draw();
      }, 1000);
    }
  }

  private drawHistory = () => {
    this.map.removeLayer(this.historyLayer);
    this.historyLayer = new LayerGroup();
    this.trackingPoints.forEach(signal => {
      const droneMarker = new CircleMarker(
        signal[this.currentIndex],
        {
          color: 'red',
          fillColor: '#ADD8E6',
          fillOpacity: 0.5,
          radius: 5
        }
      )
      droneMarker.addTo(this.historyLayer);
    });
    this.historyLayer.addTo(this.map);
    this.updateIndex();
  }

  private updateIndex = () => {
    if (this.currentIndex + 1 === this.trackingPoints[0].length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
}



export default TrackingHistory;