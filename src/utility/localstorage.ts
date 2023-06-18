import { Radar } from "../views/map/Map"

const RADAR_KEY = "radars"

export const addNewRadar = (value: Radar) => {
  const currentValueString = localStorage.getItem(RADAR_KEY)

  if (currentValueString) {
    const currentValue = JSON.parse(currentValueString) as Radar[]
    currentValue.push(value)
    localStorage.setItem(RADAR_KEY, JSON.stringify(currentValue))
    console.log(currentValue)
    return
  }

  localStorage.setItem(RADAR_KEY, JSON.stringify([value]))
}

export const deleteStation = (stationDetails: Radar) => {
  const currentValueString = localStorage.getItem(RADAR_KEY)

  if (currentValueString) {
    const currentStationList = JSON.parse(currentValueString) as Radar[]
    const updatedStationList = currentStationList.filter(
      (station) => station.id != stationDetails.id
    )
    localStorage.setItem(RADAR_KEY, JSON.stringify(updatedStationList))
  }
}
export const getRadars = (): Radar[] => {
  const currentValueString = localStorage.getItem(RADAR_KEY)

  if (currentValueString) {
    return JSON.parse(currentValueString) as Radar[]
  }

  return []
}
