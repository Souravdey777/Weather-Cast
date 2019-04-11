import React, { Component } from 'react';
import ClassNames from './temperatureModal.module.css';
import ReactAnimatedWeather from 'react-animated-weather';

let lastScrollY = 0;

class TemperatureModal extends Component {


    componentWillMount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    tempModal = React.createRef();
    description = React.createRef();
    icon = React.createRef();

    handleScroll = () => {
        lastScrollY = window.scrollY;

        if (lastScrollY > 50) {
            this.tempModal.current.style.width = "100px";
            this.tempModal.current.style.height = "100px";
            this.description.current.style.opacity = "0";
            this.icon.current.style.opacity = "0";
        }
        else {
            this.tempModal.current.style.width = "300px";
            this.tempModal.current.style.height = "300px";
            this.description.current.style.opacity = "1";
            this.icon.current.style.opacity = "1";
        }
    };


    render() {

        return (
            <div>
                {this.props.weatherData ? (
                <div ref={this.tempModal} className={ClassNames.tempModal} style={{
                    color:"rgb(198, 102, 0)"}}>
                    <div ref={this.icon} className={ClassNames.description}>
                        <ReactAnimatedWeather
                            icon="CLOUDY"
                            color="rgb(198, 102, 0)"
                            size={64}
                            animate={true}
                        />
                    </div>
                    <div ref={this.description} className={ClassNames.description}>
                        {this.props.weatherData.weather.map(content => {
                            return (content.description.charAt(0).toUpperCase() + content.description.slice(1))
                        })}
                    </div>
                    <div className={ClassNames.temp}>
                        {(this.props.weatherData.main.temp - 273.15).toFixed(2)}°C
                    </div>
                    <div className={ClassNames.city}>
                        {this.props.weatherData.name},{this.props.weatherData.sys.country}
                    </div>

                </div>) : null
                }
            </div>
        );
    }
}

export default TemperatureModal;
