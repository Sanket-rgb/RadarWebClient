import { FunctionComponent } from "react"
import authState from "../../store/authStore";
import supabase from "../../utility/supabaseclient";
import { SideNavItem } from "./SideNavComponent"

interface SideNavItemsProps {
  itemClicked: Function
}

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  authState.setSession(null);
}

const SideNavItems: FunctionComponent<SideNavItemsProps> = (props) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <ul className="list-group">
        <li
          className="list-group-item d-flex justify-content-start align-items-center"
          onClick={() => props.itemClicked(SideNavItem.LIST_OF_STATIONS)}
        >
          <span className="material-symbols-outlined">radar</span>
          <span className="ps-3">List of stations</span>
        </li>
        <li
          className="list-group-item d-flex justify-content-start align-items-center"
          onClick={() => props.itemClicked(SideNavItem.TRACKING_HISTORY)}
        >
          <span className="material-symbols-outlined">history</span>
          <span className="ps-3">Tracking history</span>
        </li>
      </ul>

      <li
        className="list-group-item d-flex justify-content-start align-items-center"
        onClick={() => logout()}
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="ps-3">Log out</span>
      </li>
    </div>
  )
}

export default SideNavItems
