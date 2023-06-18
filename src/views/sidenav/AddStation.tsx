import { LatLng } from "leaflet"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { Radar } from "../map/Map"
import MapParent from "../map/MapParent"
import { addNewRadar } from "../../utility/localstorage"
import "./AddStation.scss"
import supabase from "../../utility/supabaseclient"
import dialogState from "../../store/dialogStore"

const AddStation = (props: any) => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [rotation, setRotation] = useState("")
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("open")
      ref.current.showModal()
    }
  }, [])

  const flyToStation = (latlng: LatLng) => {
    const mapParentInstance = MapParent.getInstance()
    mapParentInstance.flyTo(latlng)
  }

  const successCallback = (position: any) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  const errorCallback = (error: any) => {
    console.log(error)
  }

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const locationInfo = new LatLng(Number(latitude), Number(longitude))
    const newRadar: Radar = {
      id: id,
      name: name,
      pos: locationInfo,
      rotation: Number(rotation),
      active: true,
      lastDetection: Date,
    }
    const { error } = await supabase.from("station_list").insert(newRadar)

    MapParent.getInstance().mapDrawings.createRadarLocLayer()
    props.onRefreshStationList()
    dialogState.setShowAddStationDialog(false)
    flyToStation(locationInfo)
  }

  const isDisabled = () => {
    return (
      id === "" ||
      name === "" ||
      latitude === "" ||
      longitude === "" ||
      rotation === ""
    )
  }

  return (
    <React.Fragment>
      {/* <div
        className={classes.backdrop}
        onClick={props.onFormVisibilityHandler}
      /> */}
      <dialog ref={ref}>
        <h3 className="dialog-title">Add station</h3>
        <div className="dialog-content">
          <form onSubmit={handleSubmit}>
            <input
              type={"text"}
              placeholder="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type={"text"}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Rotation"
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
              required
            />
            <button type="button" onClick={getCurrentPosition}>
              Get Location
            </button>
            <br></br>
          </form>
        </div>
        <div className="dialog-footer">
          <button type="button" onClick={() => dialogState.setShowAddStationDialog(false)}>
            Cancel
          </button>
          <button
            type="submit"
            className="submitbutton"
            onClick={(e) => handleSubmit(e)}
            disabled={isDisabled()}
          >
            Confirm
          </button>
        </div>
      </dialog>
    </React.Fragment>
  )
}

export default AddStation
