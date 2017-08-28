import React,  { Component } from 'react';

import axios from 'axios';
import '../app.scss';

class Input extends Component {
    constructor(props) {
        super(props)

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldInput = this.fieldInput.bind(this);
        this.handleSwitch =  this.handleSwitch.bind(this);

        this.state = {
            zipcode: "",
            payload: [],
            toggle: true
        }
    }

    handleKeyPress(ev){
        if(ev.key === 'Enter') {
            this.fieldInput()
        }
    }

    handleChange(ev) {
        const input = ev.target.value;
        if(input){
            this.setState({ zipcode: input })
        }
    }

    handleSwitch(ev) {
        const toggle = this.state.toggle
        this.setState({ toggle: !toggle })
    }
    // switchTemp(){
    //     if (this.state.toggle) {
    //         return (
    //             <div>
    //                 <form onSubmit={this.fieldInput} autoComplete="off">
    //                 <input  id="input"
    //                             type="numbers"
    //                             onKeyPress={this.handleKeyPress}
    //                             onChange={this.handleChange}
    //                             value={this.state.zipcode}
    //                             placeholder = "Enter Zip Code" />
    //                     <button value="Submit"
    //                             type="submit">Enter</button>
    //                     <button id="switchButton" type="button" onClick={this.handleSwitch}>{toggle ? 'Fahrenheit' : 'Celcius'}</button>
    //                 </form>
    //                 <div className="day" key={i}>
    //                         <span id="dayFont">{item[1][0]}</span><br />
    //                         {item[1][1]}, {item[1][2]}<br />
    //                         <img src={`./icons/${item[0].icon}`} alt="icon" />
    //                         {item[0].weather}<br />
    //                         <span>Max. Temp: {item[0].maxTempF}°F/Min. Temp: {item[0].minTempF}°F</span><br />
    //                 </div>
    //             </div>
    //         ) 
    //     } else {
    //     return (
    //         <div>
    //             <form onSubmit={this.fieldInput} autoComplete="off">
    //             <input  id="input"
    //                         type="numbers"
    //                         onKeyPress={this.handleKeyPress}
    //                         onChange={this.handleChange}
    //                         value={this.state.zipcode}
    //                         placeholder = "Enter Zip Code" />
    //                 <button value="Submit"
    //                         type="submit">Enter</button>
    //                 <button id="switchButton" type="button" onClick={this.handleSwitch}>{toggle ? 'Fahrenheit' : 'Celcius'}</button>
    //             </form>
    //             <div className="day" key={i}>
    //                     <span id="dayFont">{item[1][0]}</span><br />
    //                     {item[1][1]}, {item[1][2]}<br />
    //                     <img src={`./icons/${item[0].icon}`} alt="icon" />
    //                     {item[0].weather}<br />
    //                     <span>Max. Temp: {item[0].maxTempF}°F/Min. Temp: {item[0].minTempF}°F</span><br />
    //             </div>
    //         </div>
    //     )
    // }}

    fieldInput(ev) {
        ev.preventDefault()

        let that = this
        let zipcode = this.state.zipcode
        let keyOld = '0aa110521d339338fb5cee5accc65604'
        let clientId = '1KdtgMmSqBfcaXM466EC5'
        let secretKey = 'KhKLdjqgzjl5PgcweXYP6VuFH5k1GmDED9bRvdlR'
        let  dayName  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        console.log('Zip Code:',this.state.zipcode)

        axios.get(`http://api.aerisapi.com/forecasts/${zipcode}?client_id=${clientId}&client_secret=${secretKey}`)
        .then(response => {
            console.log('Response:',response)
            let { info } = response.data.response[0];
            let len = response.data.response[0].periods.length
            console.log('Length:',len)
            console.log('Info:', response.data.response[0].periods)
            let payload = this.state.payload
            for (var i = 0; i < len; i++ ) {
                let date = (response.data.response[0].periods[i].dateTimeISO)
                let day = new Date(`${date}`)
                let dayWeek = day.getDay()
                let getDate = day.toLocaleDateString('en-US', options).split(", ")

                payload.push([response.data.response[0].periods[i],getDate])
            }

            this.setState({ payload: payload, zipcode: "" })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });  
    }

    render () {
        // -?(\d{4})?
        let { payload, display } = this.state
        
        return (
            <div>
                <form onSubmit={this.fieldInput} autoComplete="off">
                    <input  id="input"
                            type="numbers"
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange} 
                            value = {this.state.zipcode}
                            placeholder = "Enter a Zip Code"
                             />
                    <button  value="Submit"
                            type="submit">Enter</button>
                </form>

                <div id="cell">
                    
                    { payload.map((item,i) => (
                            <div className="day" key={i}>
                                <span id="dayFont">{item[1][0]}</span><br />
                                {item[1][1]}, {item[1][2]}<br />
                                {item[0].weather}<br />
                               
                                Max. Temp: {item[0].maxTempF}°F/{item[0].maxTempC}°C<br />
                                Min. Temp: {item[0].minTempF}°F/{item[0].minTempC}°C<br />
                            </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Input;