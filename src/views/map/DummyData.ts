import { LatLng } from "leaflet";
import { Radar } from "./Map";

export type TrackingData = {
  id: number;
  startTime: number;
  trackingPoints: LatLng[][];
}

let date = new Date();

export const dummyradars: Radar[] = [
  {
    id: "ds-1",
    name: "Otaneimi 1",
    pos: new LatLng(60.1811, 24.8317),
    rotation: 0,
    active: true,
    lastDetection: date
  },
  // {
  //   id: "2",
  //   name: "Elfvik 1",
  //   pos: new LatLng(60.2016, 24.8224),
  //   rotation: 180,
  //   active: true,
  //   lastDetection: date
  // },
  // {
  //   id: "3",
  //   name: "Westend 1",
  //   pos: new LatLng(60.1621, 24.7969),
  //   rotation: 180,
  //   active: true,
  //   lastDetection: date
  // },
  // {
  //   id: "4",
  //   name: "Nokkala 1",
  //   pos: new LatLng(60.1477, 24.7548),
  //   rotation: 270,
  //   active: false,
  //   lastDetection: date.setDate(date.getDate() - 1)
  // }
]

export const dummytrackingdata = [
  {
    id: 1,
    startTime: date.setMinutes(date.getMinutes() - 30),
    trackingPoints: [
      [
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1773, 24.8840)
      ],
      [
        new LatLng(60.1773, 24.8840),
        new LatLng(60.1794, 24.8807),
        new LatLng(60.1814, 24.8780),
        new LatLng(60.1840, 24.8741),
        new LatLng(60.1855, 24.8662),
        new LatLng(60.1871, 24.8564),
        new LatLng(60.1885, 24.8484),
        new LatLng(60.1898, 24.8400),
        new LatLng(60.1888, 24.8321),
        new LatLng(60.1861, 24.8290),
        new LatLng(60.1820, 24.8314)
      ]
    ]
    
  }
]

const dummyradardata = [
  {
    id: 1,
    angleRad: 0
  },
  {
    id: 2,
    angleRad: Math.PI/2
  },
  {
    id: 3,
    angleRad: Math.PI * 3/2
  }
  // ,
  // {
  //   id: 4,
  //   angleRad: Math.PI
  // }
]