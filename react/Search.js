import * as React from 'react';
import { Socket } from './Socket';

export class Search extends React.Component{
    constructor(props){
        super(props);
        
        this.state = { name: '', date: '', mlocation: ''}        
        
         this._handleSubmit = this._handleSubmit.bind(this);
         this.nameChange = this.nameChange.bind(this);
         this.locationChange = this.locationChange.bind(this);
         this.dateChange = this.dateChange.bind(this);
    }
    
    nameChange(e){
        this.setState({name: e.target.value});
    }
    
    locationChange(e){
        this.setState({mlocation: e.target.value});
    }
    dateChange(e){
        
    }
    
    _handleSubmit(e) {
        FB.getLoginStatus((response) => {
            if (response.status == 'connected') {
                Socket.emit('Search', {
                    'facebook_user_token':
                response.authResponse.accessToken,
                'location': this.state.mlocation,
                'distance': 200,
                'name': this.state.name,
                'date': this.state.date
                });
            }
        });
    }
    
    render(){
        
        
        return(
            <div>
                <form>
                    <label for="name">Enter a name:</label>
                    <input id = "name" type="text" value={this.state.name} onChange={(e)=>this.nameChange(e)} />
                    <label for="location">Enter a location:</label>
                    <input id = "location" type="text" value={this.state.mlocation} onChange={(e)=>this.locationChange(e)} />
                    <label for="date"> Enter a date: </label>
                    <input id = "date" type="date" value ={this.state.mdate} onChange = {(e)=>this.dateChange(e)} />
                    <button type="button" onClick={this._handleSubmit}>Search</button>
                </form>
            </div>
            );
    }
}