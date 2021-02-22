import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";

import './header.styles.scss';
 class Header extends Component {
     constructor(props){
         super(props);
         this.state = {search : ""};
     }
    renderContent() {
        if (this.props.auth) {
         
           if(!this.props.auth.Exist)
            return <span><a href="/auth/google">Login With Google</a></span>;
         else{
            return [
            
              <span key="2"><a href="/auth/logout">Logout</a></span>
            ];
        }
    }
        else return null
      }
    
      handleChange = (e)=>{
        
        if(e.key == "Enter") {
            this.setState({search : e.target.value})
        }
      }
    render() {
        
        const renderStuff = () =>{
            if(this.state.search != "") {
                    const username = this.state.search;
                this.setState({search : ""}); 

                return <Redirect to = {`/user/${this.state.search}`} />
            }
        }
   
        return (
            <div className="header">
           
                    {renderStuff()}
                    <div className="sub-header">
                    <Link  onClick = {this.props.reload} to = {this.props.auth && this.props.auth.Exist ? '/feed' : '/' } >ChitChat</Link>
                    <input type ="text" placeholder = "search users" onKeyPress = {this.handleChange}/>
                    <span className = "sub-menu">
                        {this.renderContent()}
                    </span>
                    </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    
    return {auth};
    
}

// const mapDispatchToProps = {
    
// }

export default connect(mapStateToProps)(Header)
