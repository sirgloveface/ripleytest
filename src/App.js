import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css'
const MarkComponent = ({ text }) => <div>{text}</div>;

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.data.timezone}</h1>
          <p>{this.props.data.temperature}°C</p>
          <p>{this.props.data.summary}</p>
          <button onClick={this.props.closePopup}>Cerrar</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  static defaultProps = {
    center: {
      lat: -33.4489,
      lng: -70.6693
    },
    zoom: 2
  }
  constructor() {
    super();
    this.state = {
      showPopup: false,
      data: {}
    };
  }
  _togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      data: {}
    })
  }
  _onClick = ({x, y, lat, lng, event}) => {

    fetch(`https://ripley-test-api.herokuapp.com/weather/getWeather/${lat},${lng}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      console.log(!this.state.showPopup)
      this.setState({
        showPopup: !this.state.showPopup,
        data: data
      });
    })
    .catch(console.log)

    console.log(x, y, lat, lng, event)
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>  
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAvVAa9NTJvsDzs2N4_AC5lfIFIN3gn5UM' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this._onClick}
         /* options={{ scrollwheel: false}}*/
        >
          <MarkComponent
            lat={-33.4489}
            lng={-70.6693}
            text="Marcador Santiago"
          />
        </GoogleMapReact>
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            closePopup={this._togglePopup.bind(this)}
            data={this.state.data}
          />
          : null
        }
      </div>
    );
  }
}

export default App