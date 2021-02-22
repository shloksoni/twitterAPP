import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import * as actions from '../actions';

export class NewUser extends Component {
    constructor(props){
        super(props);
        this.state = {inputValue : "", available : null, profile : null}
    }
    handleChange = (e) =>{
        this.setState({inputValue : e.target.value, available : null});
    }
    handleSubmit = (e) =>{
        e.preventDefault();

        const profile = {
            username : this.state.inputValue,
            fname : e.target.fname.value,
            sname :  e.target.sname.value,
            skills : e.target.skills.value
        }
        // console.l    og(profile);
        this.setState({profile : profile});
        axios.post('/auth/checkUsername',{
            username : this.state.inputValue
        })
        .then(res => {
            if(res.data){
                this.setState({available : true});
            }
            else
            {
                this.setState({available : false});
            }
        });

    }
    addUser = (e) =>{
       
          console.log(this.state.profile);
        axios.post('/auth/createUsername',{
            username : this.state.inputValue
        })
        .then(res => {
            axios.post('/profiles/createProfile', this.state.profile)
        })
        .then(res => {
                this.props.fetchUser();
            });
    

      
        // 
        // .then(res => console.log(res));
        // 
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit} >
                <br/><br/><br/>
                <input placeholder = "enter Username" value = {this.state.inputValue} onChange = {this.handleChange}/>

                    
                    <input name = "fname" placeholder = "First Name"  />
                    <input name = "sname" placeholder = "Second Name"  />
                    <input name = "skills" placeholder = "Skills" />
                    <button type = "submit">Check Avaiblity</button>
                    {this.state.available === false ? <span>username taken</span> : null}
                    {this.state.available && <button onClick = {this.addUser}>Confirm</button>}
                </form>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
    
// })

// const mapDispatchToProps = {
    
// }

export default connect(null,actions)(NewUser)
