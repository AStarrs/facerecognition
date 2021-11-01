import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: 'e35f3dfb72ba46d789adb4d944457fd3'
 });

const particalsOptions =  {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 700
      }
    },
    move: {
      speed: 2
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.COLOR_MODEL,
        "https://samples.clarifai.com/face-det.jpg")
      .then(
        function(response) {
          console.log(response)
        },
        function(err) {

        }
      );
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles'
                params={particalsOptions}
              />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
