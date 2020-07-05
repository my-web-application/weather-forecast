import React, { Component } from 'react';
import axios from 'axios';

// import sunny_img from '../../assets/image/sunny.png';
import humi_img from '../../assets/image/humi.png';
import wind_img from '../../assets/image/wind.png';

class GetReport extends Component{

   constructor(props){
      super(props);
      this.state = {
         latitude: null,
         longitude: null,
         pin_code: null,
         update_location: false,
         weather_report: false,
         weather_report_details: {}
      }
   }

   componentDidUpdate(){
      // console.log('props',this.props.location, 'State',this.state);
      if(this.props.location.is_allow === true && this.state.update_location === false){
         this.setState({
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            update_location: true
         });
      }

      if((this.props.location.pincode1 !== null && this.props.location.pincode2 !== null)&& 
         (this.props.location.pincode1.length === 3 && this.props.location.pincode2.length === 3)
         && this.state.pin_code === null){
            this.setState({
               pin_code: this.props.location.pincode1+this.props.location.pincode2,
               weather_report: false,
            });
      }

      if(this.state.pin_code !== null && this.state.pin_code !== this.props.location.pincode1+this.props.location.pincode2){
         this.setState({
            pin_code: this.props.location.pincode1+this.props.location.pincode2,
            weather_report: false,
         });
      }

      if(this.state.pin_code !== null && this.state.weather_report === false){
         this.CheckWeatherUsingPincode(this.state.pin_code);
      }else if(this.state.update_location !== false && this.state.weather_report === false){
         this.getWeather(this.state.latitude, this.state.longitude);
      }
   }

   UpdatePincode = (getpin, state_value) => {
      console.log(state_value.pin_code);
      if((getpin.pincode1 !== null && getpin.pincode2 !== null)&& 
         (getpin.pincode1.length === 3 && getpin.pincode2.length === 3)
         && state_value.pin_code === null){
            return getpin.pincode1+getpin.pincode2;
      }
      return false;
   }

   CheckWeatherUsingPincode = async (pincode) => {
      if(pincode.length === 6){
         /*const get_report = await 
         fetch(`https://api.openweathermap.org/data/2.5/weather?zip=`+pincode+`,in&appid=a6cfd6f227559687a89412a9a75bf219&units=metric`);
         const data = await get_report.json();
         // console.log('data is: ', data);
         this.setState({
            weather_report: true,
            weather_report_details: data
         },
         (error) => {
            this.setState({
               weather_report: 'error'
            });
         }
         );*/
         await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=`+pincode+`,in&appid=a6cfd6f227559687a89412a9a75bf219&units=metric`)
            .then(
               (response) => {
                  this.setState({
                     weather_report: true,
                     weather_report_details: response.data
                  });
               },
               (error) => {
                  this.setState({
                     weather_report: 'error'
                  });
               }
            )
         // console.log('From pincode',this.state);
      }
   }

   getWeather = async (latitude, longitude) => {
      /*const api_call = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude + `&appid=a6cfd6f227559687a89412a9a75bf219&units=metric`);
      const data = await api_call.json();
      // console.log('data is: ', data);
      this.setState({
         weather_report: true,
         weather_report_details: data
      });*/
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude + `&appid=a6cfd6f227559687a89412a9a75bf219&units=metric`)
         .then(response => {
            this.setState({
               weather_report: true,
               weather_report_details: response.data
            });
         },
            (error) => {
               this.setState({
                  weather_report: 'error'
               });
            }
         );
      // console.log('from weather',this.state);
   }

   changeTemparatureHandeler = (temp) => {
      return (temp);
   }

   render(){
      return(
         <div className="weather_details">
            <div className="row">
               {(
                  () => {
                     if(this.state.weather_report === false){
                        return (<div style={{textAlign: 'center'}}>Loading...</div>);
                     }
                     else if(this.state.weather_report === 'error')
                     {
                        return (<div style={{textAlign: 'center'}}>Data error</div>);
                     }
                     else{
                        const icon = `http://openweathermap.org/img/wn/`+this.state.weather_report_details.weather[0].icon+`@2x.png`;
                        const icon_desc = this.state.weather_report_details.weather[0].description;
                        return(<React.Fragment>
                           <div className="col-md-6">
                              <div>
                                 <span><img src={icon} alt={icon_desc} style={{width:'20%'}} className="weather_img" title={icon_desc} /></span>
                                 <span>{this.state.weather_report_details.main.temp} <sup>o</sup>C</span>
                                 <span>/</span>
                                 <span>{this.changeTemparatureHandeler(this.state.weather_report_details.main.temp)} <sup>o</sup>F</span>
                                 {/* <!-- <span>Cloud</span> --> */}
                                 <p>
                                    <span>Area: {this.state.weather_report_details.name}</span>
                                 </p>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <p>
                                 <span><img src={humi_img} alt="Humidity" className="weather_img" /></span>
                                 <span>Humidity: </span>
                                 <span>{this.state.weather_report_details.main.humidity}%</span>
                              </p>
                              <p>
                                 <span><img src={wind_img} alt="Wind" className="weather_img" /></span>
                                 <span>Wind: </span>
                                 <span>{this.state.weather_report_details.wind.speed} km/h</span>
                              </p>
                           </div>
                        </React.Fragment>);
                     }
                  }
               )()}
            </div>
         </div>
      )
   }
}

export default GetReport;