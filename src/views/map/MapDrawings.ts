import {
  Circle,
  CircleMarker,
  divIcon,
  icon,
  LatLng,
  Layer,
  LayerGroup,
  Map,
  Marker,
  marker,
  Polyline,
} from "leaflet"
import { getRadars } from "../../utility/localstorage"
import { dummyradars } from "./DummyData"
import TrackingHistory from "./TrackingHistory"

import { Radar } from "./Map"
import supabase from "../../utility/supabaseclient"

const dronePosCenter = [60.1801, 24.83]
let droneAngle = 0

const getFlyingDronePos = () => {
  const y = 1
  const x = 0
  let rotatedY = x * Math.sin(-droneAngle) + y * Math.cos(-droneAngle)
  let rotatedX = x * Math.cos(-droneAngle) - y * Math.sin(-droneAngle)
  const radarLength = 0.0005
  rotatedY = rotatedY * radarLength
  rotatedX = rotatedX * radarLength * 2
  droneAngle += 0.0015
  return new LatLng(dronePosCenter[0] + rotatedY, dronePosCenter[1] + rotatedX)
}

// const dummyRotate = () => {
//   setTimeout(() => {
//     dummyradardata.map(radarDir => {
//       radarDir.angleRad += 0.01
//     })
//     dummyRotate()
//   }, 50)
// }
// async function doSomething(): Promise<Radar[]> {
//   let result = null
//   try {
//     result = await getStations()
//     console.log(result)

//   } catch (error) {
//     console.error(error)
//   }
//   return result as Radar[]
// }

class MapDrawings {
  // static instance: MapDrawings;
  private map: Map | null
  private radarLocLayer: LayerGroup
  private radarDirLayer: LayerGroup
  private dummyDroneLayer: LayerGroup
  private trackingHistory: TrackingHistory
  private radars: Radar[];

  constructor(map: Map) {
    this.map = map
    this.radarDirLayer = new LayerGroup()
    this.dummyDroneLayer = new LayerGroup()
    this.radarLocLayer = new LayerGroup()
    console.log("MapDrawings has been inited")
    this.createRadarLocLayer()
  }

  public updateMap = (map: Map) => {
    this.map?.eachLayer((layer) => {
      this.map?.removeLayer(layer)
    })
    this.map = map
    this.createRadarLocLayer()
  }

  // public static getInstance = () => {
  //   if (!MapDrawings.instance) {
  //     MapDrawings.instance = new MapDrawings();
  //   }
  //   return MapDrawings.instance
  // }

  // public initMap = (map: Map) => {
  //   this.map = map;

  //   // this.createRadarDirLayer();
  // }

  public startTrackingHistory = (trackingPoints: LatLng[][]) => {
    if (!this.trackingHistory) {
      this.trackingHistory = new TrackingHistory(this.map!, trackingPoints)
      return
    }
    this.trackingHistory.updateTrackingPoints(trackingPoints)
  }

  public createRadarLocLayer = async () => {
    const { data } = await supabase.from("station_list").select()
    this.radars = data as Radar[]

    this.map!.removeLayer(this.radarLocLayer)

    
    const radarLocLayer = new LayerGroup()
    this.radars.forEach((dummyradar) => {
      const markerHtmlStyles = `
      width: 32px;
      height: 32px;
      display: block;
      left: -8px;
      top: -8px;
      background-image: url('./radar.svg');
      position: relative;
      border-radius: 32px;
      transform: rotate(${dummyradar.rotation}deg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-color: #ffffff;
      `

      const customIcon = divIcon({
        className: "my-custom-pin",
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [16, 16], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        html: `<span style="${markerHtmlStyles}" />`,
      })
      const customMarker = marker(dummyradar.pos, {
        icon: customIcon,
      })
      customMarker.addTo(radarLocLayer)
      // const c = new CircleMarker(
      //   dummyradar.pos,
      //   {
      //     color: dummyradar.active? 'blue' : '#ffb838',
      //     fillColor: dummyradar.active? '#ADD8E6' : '#fffdd0',
      //     fillOpacity: 0.5,
      //     radius: 10
      //   }
      // )
      // c.addTo(radarLocLayer);
    })
    this.radarLocLayer = radarLocLayer
    this.radarLocLayer.addTo(this.map!)
  }

  // private createRadarDirLayer = () => {
  //   this.radarDirLayer = new LayerGroup()
  //   dummyradardata.forEach(radarDir => {
  //     dummyradarlocdata.forEach(radarLoc => {
  //       if (radarDir.id === radarLoc.id) {
  //         const y = 1
  //         const x = 0
  //         let rotatedY = x * Math.sin(-radarDir.angleRad) + y * Math.cos(-radarDir.angleRad);
  //         let rotatedX = x * Math.cos(-radarDir.angleRad) - y * Math.sin(-radarDir.angleRad);
  //         const radarLength = 0.002
  //         rotatedY = rotatedY * radarLength;
  //         rotatedX = rotatedX * radarLength * 2;
  //         const l = new Polyline(
  //           [
  //             new LatLng(radarLoc.pos[0], radarLoc.pos[1]),
  //             new LatLng(radarLoc.pos[0] + rotatedY, radarLoc.pos[1] + rotatedX)
  //           ]
  //           ,
  //           {
  //             color: 'blue',
  //             fillColor: '#ADD8E6',
  //           }
  //         )
  //         l.addTo(this.radarDirLayer);
  //       }

  //     });
  //   })

  //   this.radarDirLayer.addTo(this.map!);
  // }

  private degreesToRadians(degrees: number) {
    var pi = Math.PI
    return degrees * (pi / 180)
  }

  public updateRotation = (id: string, newDir: number) => {
    this.map!.removeLayer(this.radarDirLayer)
    this.radarDirLayer = new LayerGroup()
    this.radars.forEach((radar) => {
      if (radar.id !== id) {
        return
      }
      const adjustedDir =
        this.degreesToRadians(newDir) + this.degreesToRadians(radar.rotation)
      console.log(adjustedDir)
      const y = 1
      const x = 0
      let rotatedY = x * Math.sin(-adjustedDir) + y * Math.cos(-adjustedDir)
      let rotatedX = x * Math.cos(-adjustedDir) - y * Math.sin(-adjustedDir)
      const radarLength = 0.002
      rotatedY = rotatedY * radarLength
      rotatedX = rotatedX * radarLength * 2
      console.log(radar.pos)
      const l = new Polyline(
        [
          radar.pos,
          new LatLng(radar.pos.lat + rotatedY, radar.pos.lng + rotatedX),
        ],
        {
          color: "blue",
          fillColor: "#ADD8E6",
        }
      )
      l.addTo(this.radarDirLayer)
    })
    this.radarDirLayer.addTo(this.map!)
  }

  private drawDemoDrone = () => {
    const demoDronePos = getFlyingDronePos()
    this.dummyDroneLayer = new LayerGroup()
    const droneMarker = new CircleMarker(demoDronePos, {
      color: "red",
      fillColor: "#ADD8E6",
      fillOpacity: 0.5,
      radius: 5,
    })
    droneMarker.addTo(this.dummyDroneLayer)

    getRadars().forEach((dummyradar) => {
      const l = new Polyline([dummyradar.pos, demoDronePos], {
        color: "blue",
        fillColor: "#ADD8E6",
      })
      l.addTo(this.dummyDroneLayer)
    })

    this.dummyDroneLayer.addTo(this.map!)
  }

  private updateDrawings = () => {
    if (this.map) {
      this.map.removeLayer(this.radarDirLayer)
      this.map.removeLayer(this.dummyDroneLayer)
      // this.drawDemoDrone();
      // this.createRadarDirLayer();
    }
    window.requestAnimationFrame(this.updateDrawings)
  }
}

export default MapDrawings
