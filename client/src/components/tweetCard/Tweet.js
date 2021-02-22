import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Axios from 'axios';
import Comment from '../commentCard/comment';

import './tweet.scss';
class Tweet extends React.Component{

  constructor(props){
    super(props);
    this.state = { 
      liked : null,
      likes : null,
      comments: []
    }
  }
  componentDidMount(){
   this.setState({liked : this.props.liked, likes : this.props.likes, showComments: false})
  }
  updateDislike = () =>{
    Axios.post('/tweet/dislikeTweet',{
      tweet_id : this.props.tweet_id
    })
    .then(res =>{
      if(res.data === "success"){
        this.setState({liked : false, likes : this.state.likes - 1});
      }
    })
  }
  updateLike = () =>{
    Axios.post('/tweet/likeTweet',{
      tweet_id : this.props.tweet_id
    })
    .then(res =>{
      if(res.data === "success"){
        this.setState({liked : true, likes : this.state.likes +1 });
      }
    })
  }

  handleComments = () =>{

    if(this.state.showComments === true){
      this.setState({showComments : false});
      return;
    }
    Axios.post('/comments/getComments',{
      tweet_id : this.props.tweet_id
    })
    .then(res =>{
      this.setState({comments : res.data, showComments : true});
    })
    

  }

  postComment = (e) =>{
    e.preventDefault();
    Axios.post('/comments/postComment',{
      tweet_id : this.props.tweet_id,
      comment_text : e.target.commentInput.value,
    })
    .then(res => {
    
      this.setState({comments : [res.data, ...this.state.comments], showComments : true})
    });
    e.target.commentInput.value = ""
    
  }
  render(){
    const {username,tweet} = this.props;
    const {likes} = this.state;
    const profileImg = "https://lh3.googleusercontent.com/a-/AOh14GjCOBB4vaXtAre3mCklYunP_QaDf9WO_K_9eSJWPg"

      const renderComments = () =>{
       
        return this.state.comments.map((comment) => 
        <Comment username = {comment.username} comment_text = {comment.comment_text} /> 
      );
      }
      return (
              <div className="w3-card-4 ma2 mt4 ">
                <header className="w3-container w3-light-grey">
                  <h5> <Link to= {`/user/${username}`} >@{username}</Link></h5>
                </header>
                <div className="w3-container">
                  <img src= {profileImg} alt="Avatar" className ="w3-left w3-circle w-10 ma3" />
                  <p>{tweet}</p>
                </div>
                <div className ="flex sub-tweet">
                {
                   this.state.liked? 
                     <span className = "w3-button w3-blue" onClick = {this.updateDislike}>Unlike   {likes}</span> 
                   :  <span className = "w3-button w3-red" onClick = {this.updateLike}>Like   {likes}</span> 
                }
                
                <button className=" w3-button w3-dark-grey " onClick = {this.handleComments}>{this.state.showComments ? '-' : '+'} Comments</button>
                <form onSubmit ={this.postComment} className = "comment-input"> 
                  <input type= "text" name = "commentInput" placeholder ="Comment here" />
                </form>
                </div>
                {this.state.showComments ? renderComments() : null}
              </div> 
    )
  } 
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)
