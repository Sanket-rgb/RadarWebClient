import { LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { Radar } from "../map/Map";
import MapParent from "../map/MapParent";
import { deleteStation, getRadars } from "../../utility/localstorage";
import AddStation from "./AddStation";
import DeleteStation from "./DeleteStation";
import supabase from "../../utility/supabaseclient";
import { observer } from "mobx-react-lite";
import dialogState from "../../store/dialogStore";

const StationsList = observer(() => {
  const [deleteForm, setDeleteForm] = useState(false);
  const [radarList, setRadarList] = useState<any>([]);

  useEffect(() => {
    getStations();
  }, []);

  async function getStations() {
    const { data } = await supabase.from("station_list").select();
    setRadarList(data);
  }

  const flyToStation = (latlng: LatLng) => {
    const mapParentInstance = MapParent.getInstance();
    mapParentInstance.flyTo(latlng);
  };

  const refreshStationList = () => {
    getStations();
  };

  const deleteFormVisibility = () => {
    setDeleteForm(!deleteForm);
  };

  async function deleteHandler(dummyradar: any) {
    const { error } = await supabase
      .from("station_list")
      .delete()
      .eq("id", dummyradar.id);

    getStations();
    deleteFormVisibility();
    const mapParentInstance = MapParent.getInstance();
    mapParentInstance.mapDrawings.createRadarLocLayer();
  }

  return (
    <>
      {dialogState.showAddStationDialog && (
        <AddStation
          onRefreshStationList={refreshStationList}
        />
      )}
      <div className="stations-list-wrapper">
        <div>
          {radarList.map((dummyradar: any) => {
            return (
              <div className="station-container" key={dummyradar.id}>
                <div className="d-flex justify-content-start align-items-center">
                  <div
                    className={
                      "station-status " + (dummyradar.active ? "active" : "")
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <b className="ps-3">Name: </b>
                    <b className="ps-3">Latitude: </b>
                    <b className="ps-3">Longitude: </b>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="station-name">{dummyradar.name}</span>
                    <span className="station-name">{dummyradar.pos.lat}</span>
                    <span className="station-name">{dummyradar.pos.lng}</span>
                  </div>
                  <div className="d-flex justify-content-end align-items-center flex-grow-1">
                    <button
                      className="btn btn-primary btn-round-icon me-2"
                      onClick={() =>
                        flyToStation(
                          new LatLng(dummyradar.pos.lat, dummyradar.pos.lng)
                        )
                      }
                    >
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </button>
                    <button
                      className="btn btn-primary btn-round-icon"
                      onClick={deleteFormVisibility}
                    >
                      <span className="material-symbols-outlined">
                        delete_forever
                      </span>
                    </button>
                    {deleteForm && (
                      <DeleteStation
                        deleteFormVisibility={() => deleteFormVisibility()}
                        deleteHandler={() => deleteHandler(dummyradar)}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center pt-3 pb-3">
          <button onClick={() => dialogState.setShowAddStationDialog(true)}>Add Station</button>
        </div>
      </div>
    </>
  );
});

export default StationsList;
