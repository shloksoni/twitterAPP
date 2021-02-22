import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './tweetCard/Tweet'
import axios from 'axios';
import MakeTweet from './MakeTweet';
export class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {tweets: [], likes : {}};
    }
    componentDidMount(){

      
            axios.get('/tweet/feed/')
            .then(res => {
                var dict = {};
                if(res.data.likes){
                    res.data.likes.forEach(like=> dict[like.tweet_id] = true);
                    this.setState({tweets : res.data.tweets, likes : dict})
                    }
            });
        
       

        
    }
    addTweet = (newtweet) => {
  
        this.setState({tweets : [newtweet,...this.state.tweets]})
    }
    render() {
        if(!this.props.auth || !this.props.auth.Exist){
            console.log(this.props.auth);
            return (<h1> You Must Login first</h1>);
        }
        return (
            <div className ="ma7 mt5">
                <MakeTweet addTweet = {this.addTweet} />
               {this.state.tweets.map(({tweet_id , ...otherProps}) => {
                   var liked = null;
                   if(this.state.likes[tweet_id]) liked = true;
                   else liked = false;
                  
                   return <Tweet key = {tweet_id} tweet_id = {tweet_id} {...otherProps} liked = {liked}/>
               })}
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    
    return {auth};
    
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)


// insert into profiles values('shlok', 'Soni', 'sj9', 'soms');