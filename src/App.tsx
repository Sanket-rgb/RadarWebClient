import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import MapComponent from './views/map/MapComponent'
import HeaderComponent from './header/HeaderComponent'
import SideNavComponent from './views/sidenav/SideNavComponent'
import WebSocketConnection from './lib/WebSocketConnection'
import { observer } from 'mobx-react-lite'
import authState from './store/authStore'
import { login } from './utility/login'
import LoginView from './views/login/LoginView'

// Locas WS server
// const connection = new WebSocketConnection("ws://127.0.0.1:8765");
// connection.connect();

// Hosted WS server
const connection = new WebSocketConnection("wss://leteris.com:443");
connection.connect();

const App = observer(() => {
  useEffect(() => {
    login();
  }, [])

  return (
    <>
      {authState.session !== null ?
        <>
        <HeaderComponent />
        <div className="app-content-container">
          <SideNavComponent />
          <MapComponent />
        </div>
        </>
      :
        <LoginView />
      }
    </>
  )
})

export default App
