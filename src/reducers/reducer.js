
export const OriginReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_ORIGIN':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}


export const DestinationReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_DESTINATION':
                return{
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    address: action.payload.address,
                    name: action.payload.name
                }
            default:
                return state
    }
}

export const PaymentReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_PAYMENT':
                return{
                    type: action.payload.type
                }
            default:
                return state
    }
}