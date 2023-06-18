import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { dummyradars } from './views/map/DummyData'
import { addNewRadar } from './utility/localstorage'

// Populate localstorage with dummy data
localStorage.clear();
dummyradars.forEach(radar => {
  addNewRadar(radar)
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
