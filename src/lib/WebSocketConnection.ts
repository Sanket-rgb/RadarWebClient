import MapParent from "../views/map/MapParent";

export default class WebSocketConnection {
  private readonly url: string;
  private ws: WebSocket | null = null;
  private readonly listeners: Record<string, Array<Function>> = {};

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.addEventListener("open", () => this.handleOpen());
    this.ws.addEventListener("close", () => this.handleClose());
    this.ws.addEventListener("message", (event) => this.handleMessage(event));
    this.ws.addEventListener("error", (error) => this.handleError(error));
  }

  private handleOpen() {
    console.log(`WebSocket connection to ${this.url} opened`);
    const init_msg = {
        "device": "CLIENT",
        "type": "INIT",
        "id": "ds-1",
    }
    this.ws?.send(JSON.stringify(init_msg))
  }

  private handleClose() {
    console.log(`WebSocket connection to ${this.url} closed`);
  }

  private handleMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);
    console.log(message)
    MapParent.getInstance().mapDrawings.updateRotation(message.id, message.rotation)
    const { type } = message;
    // if (type in this.listeners) {
    //   this.listeners[type].forEach((listener) => listener(message));
    // }
  }

  private handleError(error: Event) {
    console.error(`WebSocket connection to ${this.url} errored`, error);
  }

  addListener(type: string, listener: Function) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeListener(type: string, listener: Function) {
    if (type in this.listeners) {
      const index = this.listeners[type].indexOf(listener);
      if (index !== -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  }

  send(message: object) {
    if (this.ws) {
      this.ws.send(JSON.stringify(message));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
