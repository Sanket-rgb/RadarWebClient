import { makeAutoObservable } from "mobx";

class DialogState {
  showAddStationDialog = false

  constructor() {
      makeAutoObservable(this)
  }

  setShowAddStationDialog = (newShowAddStationDialog: boolean) => {
    this.showAddStationDialog = newShowAddStationDialog;
  }
}
const dialogState = new DialogState();
export default dialogState;