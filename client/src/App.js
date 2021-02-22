import React from 'react';

import './App.css';
import {Route,Redirect, useHistory} from 'react-router-dom';
import * as actions from './actions';
import {connect} from 'react-redux';
import Header from './components/header/Header';
import Landing from './components/landing'
import Feed from './components/Feed'
import NewUser from './components/NewUser'
import UserProfile from './components/UserProfile/UserProfile';


import 'tachyons';




class App extends React.Component {


  componentDidMount(){
    
   this.props.fetchUser();

  }
 
  reload = () =>{window.location.reload(false)};

  render(){
    
  
    const renderNewUser  = () => {
      if(this.props.auth && (this.props.auth.Exist) && !this.props.auth.username){
       return <NewUser />
      }
       return <Landing /> 
    }
    return (
      <div className="app ">
        <Header reload = {this.reload} />
        <Route path ='/' exact>
        {this.props.auth && this.props.auth.username 
          ? <Redirect to ="/feed/" />
          : renderNewUser()
        }
        </Route>
       
       
        
        
        <Route path = '/feed' exact component = {Feed} />
        <Route path = '/user' component = {UserProfile} props={useHistory} />
      </div>
    );
  }

}

const mapStateToProps = ({auth}) => {
    
  
  return {auth};
  
}

export default connect(mapStateToProps,actions)(App);
