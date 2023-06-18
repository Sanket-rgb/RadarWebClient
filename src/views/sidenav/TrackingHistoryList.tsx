import { LatLng } from 'leaflet';
import { dummytrackingdata, TrackingData } from '../map/DummyData';
import MapParent from '../map/MapParent';

const TrackingHistoryList = () => {
  const getStartDate = (date: number) => {
    return new Date(date).toLocaleString();
  }

  const getDuration = (trackingPoints: LatLng[][]) => {
    const timeInterval = 30;
    const numPoints = trackingPoints[0].length - 1
    const totalSeconds = timeInterval * numPoints;
    return `${Math.floor(totalSeconds / 60)} Min ${totalSeconds % 60} Sec`
  }

  const getSignalCount = (trackingPoints: LatLng[][]) => {
    return trackingPoints.length
  }

  const playTrackingHistory = (trackingPoints: LatLng[][]) => {
    const mapParentInstance = MapParent.getInstance();
    mapParentInstance.mapDrawings.startTrackingHistory(trackingPoints);
  }

  return (
    <>
    {dummytrackingdata.map((d: TrackingData) => {
      return (
        <div className="station-container" key={d.id}>
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-column">
              <b>Start date:</b>
              <b>Duration:</b>
              <b>Signal count:</b>
            </div>
            <div className="d-flex flex-column">
              <b className="ps-3">{getStartDate(d.startTime)}</b>
              <b className="ps-3">{getDuration(d.trackingPoints)}</b>
              <b className="ps-3">{getSignalCount(d.trackingPoints)}</b>
            </div>
            <div className="d-flex justify-content-end align-items-center flex-grow-1">
              <button className="btn btn-primary btn-round-icon" onClick={() => playTrackingHistory(d.trackingPoints)}>
                <span className="material-symbols-outlined">
                  play_arrow
                </span>
              </button>
            </div>
          </div>
        </div>
      )
    })}
    </>
  )
}

export default TrackingHistoryList