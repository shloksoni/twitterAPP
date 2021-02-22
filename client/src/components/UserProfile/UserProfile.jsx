import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            profile : {}
        };
    }
    componentDidMount(){
    const url = this.props.history.location.pathname;
    const username = url.substring(url.lastIndexOf('/') + 1);
    const profile = {};
    console.log(username);
    axios.get(`/profiles/getUser?username=${username}`)
    .then(profile => this.setState({profile : profile.data[0]}));
    
    }
    render () {
    
        
        if(!this.state.profile){
            return(
                <div >
                <br/><br/>
                <br/><br/>
                <br/><br/>
                <h1>Username Not FOUND</h1>
                </div>
            )

        }
        const {fname, sname, skills, username} = this.state.profile;
        
        return (
            <div >
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <h1> UserName = {username} </h1>
            <h1> Name = {fname} {sname} </h1>
            <h1> Skills = {skills} </h1>

            
            
            
            </div>
        )
    }
   
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
