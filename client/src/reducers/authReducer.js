export default function (state = null, action){
    
    
    switch(action.type){
        case "FETCH_USER": return action.payload ;
        default: 
            return state;
    }
}