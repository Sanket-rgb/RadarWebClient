import { FunctionComponent, useEffect, useRef, useState } from "react"
import AddStation from "./AddStation"
import "./sidenav.scss"
import SideNavItems from "./SideNavItems"
import StationsList from "./StationsList"
import TrackingHistoryList from "./TrackingHistoryList"

export enum SideNavItem {
  NONE,
  LIST_OF_STATIONS,
  TRACKING_HISTORY,
}

interface SideNavComponentProps {}

const SideNavComponent: FunctionComponent<SideNavComponentProps> = () => {
  const sidenavContentRef = useRef<HTMLDivElement>(null)
  const [showSideNav, setShowSideNav] = useState(true)
  const [activeItem, setActiveItem] = useState<SideNavItem>(SideNavItem.NONE)

  const toggleSideNav = () => {
    if (sidenavContentRef.current) {
      if (showSideNav) {
        sidenavContentRef.current.style.width = "0"
      } else {
        sidenavContentRef.current.style.width = "400px"
      }
      setShowSideNav(!showSideNav)
    }
  }

  return (
    <div className="sidenav-container">
      <div className="sidenav-content" ref={sidenavContentRef}>
        <div className="background-1">
          {activeItem === SideNavItem.NONE ? (
            <SideNavItems
              itemClicked={(clickedItem: SideNavItem) =>
                setActiveItem(clickedItem)
              }
            />
          ) : (
            <>
              <li
                className="list-group-item d-flex justify-content-start align-items-center"
                onClick={() => setActiveItem(SideNavItem.NONE)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                {/* <span className="ps-3">List of stations</span> */}
              </li>
              {activeItem === SideNavItem.LIST_OF_STATIONS && <StationsList />}
              {activeItem === SideNavItem.TRACKING_HISTORY && (
                <TrackingHistoryList />
              )}
            </>
          )}
        </div>
      </div>
      <div className="sidenav-toggle-container">
        <button
          type="button"
          className="btn btn-light sidenav-toggle-button"
          onClick={toggleSideNav}
        >
          <span className="material-symbols-outlined">
            {showSideNav ? "chevron_left" : "chevron_right"}
          </span>
        </button>
      </div>
    </div>
  )
}

export default SideNavComponent
