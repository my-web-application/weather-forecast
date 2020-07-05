import React, { Component } from 'react';
import Getreport from '../Getreport/Getreport';

class Getloaction extends Component{

   state = {
      pincode1: null,
      pincode2: null,
      latitude: null,
      longitude: null,
      is_allow: false
   }

   async componentDidMount(){
      var position = await this.getCordinate();
      this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         is_allow: true
      });
   }

   getCordinate(){
      return new Promise((resp, error) => {
         navigator.geolocation.getCurrentPosition(resp);
      });
   }
   
   takepincode1 = (event) =>{
      this.setState({pincode1: event.target.value});
   };

   takepincode2 = (event) =>{
      this.setState({pincode2: event.target.value});
   };

   getWeather = async (latitude, longitude) => {
      const api_call = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude + `&appid=a6cfd6f227559687a89412a9a75bf219&units=metric`);
      const data = await api_call.json();
      console.log('data is: ', data);
   }

   componentDidUpdate(){
      if(this.state.pincode1 != null && this.state.pincode1.length>2){
         this.pin2.focus();
      }

      if(this.state.pincode2 != null && this.state.pincode2.length>2){
         this.pin2.blur();
      }
      
      if(this.state.pincode2 != null && (this.state.pincode2.length===0 && event.keyCode===8)){
         this.pin1.focus();
      }
      // console.log(this.state);
      
      // this.getWeather(this.state.latitude, this.state.longitude)
   }

   render() {
      let resp_test = '';
      let resp_class = '';
      if(this.state.is_allow === false){
         resp_test = `Please allow your location. If you block or not allow your location, enter the bellow details.`;
         resp_class = `loc_error`;
      }
      else{
         resp_test = `If you change your current location, enter the pin number bellow.`;
         resp_class = `loc_success`;
      }
      return(
         <React.Fragment>
            <div className="not_allow">
               <h3 className={resp_class}>{resp_test}</h3>
            </div>

            <div className="enter_pincode">
               <label>Enter your pin code: </label>
               <input type="number" name="" ref={(input) => {this.pin1 = input}} onKeyUp={this.takepincode1}/>
               <label>-</label>
               <input type="number" name="" ref={(input) => {this.pin2 = input}} onKeyUp={this.takepincode2} />
            </div>
            <Getreport location={this.state} />
         </React.Fragment>
      )
   }
}

export default Getloaction;