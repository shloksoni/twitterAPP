import React from 'react'
import { connect } from 'react-redux'
import './comment.scss';
export const Comment = ({username, comment_text}) => {
    console.log("hey");
    return (
        <div className = "w3-card-4 w3-dark-grey comment">
           <div>
               @{username}
           </div>
           <div>
               {comment_text}
           </div>
           
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
