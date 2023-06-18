import { LatLng } from "leaflet"

export type Radar = {
  id: string,
  name: string,
  pos: LatLng,
  rotation: number
  active: boolean,
  lastDetection: date | null
}