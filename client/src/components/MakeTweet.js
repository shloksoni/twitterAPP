import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

 class MakeTweet extends Component {
    
    constructor(props){
        super(props);
        this.state = {inputValue: "", tweet : ""};
    }
    handleChange = (event) => {
        this.setState({inputValue : event.target.value});
    }
    handleSubmit = (event) =>{
        console.log(this.props.auth);
        event.preventDefault();
        axios.post('/tweet/postTweet', {
            
            tweet : this.state.inputValue,
            username: this.props.auth.username
            
        })
        .then(res => {
            this.setState({inputValue : ""});
            this.props.addTweet(res.data)
        })
        
    }
    render() {
     
        return (
            <div >
                <form onSubmit = {this.handleSubmit}>
                <input type = "text" placeholder ="Type your tweet" value = {this.state.inputValue} onChange = {this.handleChange}/>
                <button type = "submit">Send</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
  
    return {auth};
    
}
// const mapDispatchToProps = {
    
// }

export default connect(mapStateToProps)(MakeTweet)
