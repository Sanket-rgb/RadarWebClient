import { Circle, CircleMarker, LatLng, Layer, LayerGroup, Map, Polyline } from "leaflet";
import MapDrawings from "./MapDrawings";

class MapParent {
  static instance: MapParent;
  private map: Map | null;
  public mapDrawings: MapDrawings;

  constructor () {
    this.map = null;
    console.log("MapMapParent has been inited");
  }

  public static getInstance = () => {
    if (!MapParent.instance) {
      MapParent.instance = new MapParent();
    }
    return MapParent.instance
  }

  public initMap = (map: Map) => {
    this.map = map;
    if (!this.mapDrawings) {
      this.mapDrawings = new MapDrawings(this.map);
    } else {
      this.mapDrawings.updateMap(this.map);
    }
    
    // this.createRadarDirLayer();
  }

  public flyTo = (latlng: LatLng) => {
    this.map?.flyTo(latlng, 16);
  }
}
  
export default MapParent;