import React, { Component } from "react"
import logo from './logo.svg'
import './App.css'
import ReactDOM from "react-dom"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
 

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       <div>
//         <ComposableMap>
//           <ZoomableGroup>
//           <Geographies geography={ geoUrl }>
//             {(geographies, projection) => geographies.map(geography => (
//               <Geography
//                 key={ geography.id }
//                 geography={ geography }
//                 projection={ projection }
//                 />
//             ))}
//           </Geographies>
//           </ZoomableGroup>
//         </ComposableMap>
//       </div>
//       </header>
//     </div>
//   );
// }

// export default App;



class App extends Component {
  constructor() {
    super()
 
    this.state = {
      zoom: 1,
    }
 
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }
  handleClick(geography, evt) {
    console.log("Geography data: ", geography)
  }
  render() {
    return(
      <div>
        <button onClick={ this.handleZoomIn }>{ "Zoom in" }</button>
        <button onClick={ this.handleZoomOut }>{ "Zoom out" }</button>
        <hr />
        <ComposableMap>
          <ZoomableGroup zoom={ this.state.zoom }>
          <Geographies geography={geoUrl}>
            {(geographies, projection) => geographies.map(geography => (
              <Geography
                key={ geography.id }
                geography={ geography }
                projection={ projection }
                onClick={this.handleClick}
                />
            ))}
          </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}
 
export default App