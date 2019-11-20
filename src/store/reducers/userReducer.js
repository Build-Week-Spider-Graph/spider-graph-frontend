import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    FETCH_GRAPH_START,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE,
    FETCH_GRAPH_ID_START,
    FETCH_GRAPH_ID_SUCCESS,
    FETCH_GRAPH_ID_FAILURE,
    FETCH_GRAPH_ID_LINES_START,
    FETCH_GRAPH_ID_LINES_SUCCESS,
    FETCH_GRAPH_ID_LINES_FAILURE,
    FETCH_GRAPH_ID_LINES_ID_START,
    FETCH_GRAPH_ID_LINES_ID_SUCCESS,
    FETCH_GRAPH_ID_LINES_ID_FAILURE,
    FETCH_GRAPH_ID_AREAS_START,
    FETCH_GRAPH_ID_AREAS_SUCCESS,
    FETCH_GRAPH_ID_AREAS_FAILURE,
    FETCH_GRAPH_ID_AREAS_ID_START,
    FETCH_GRAPH_ID_AREAS_ID_SUCCESS,
    FETCH_GRAPH_ID_AREAS_ID_FAILURE,
    FETCH_GRAPH_ID_LINES_ID_POINTS_START,
    FETCH_GRAPH_ID_LINES_ID_POINTS_SUCCESS,
    FETCH_GRAPH_ID_LINES_ID_POINTS_FAILURE,
    FETCH_GRAPH_ID_AREAS_ID_POINTS_START,
    FETCH_GRAPH_ID_AREAS_ID_POINTS_SUCCESS,
    FETCH_GRAPH_ID_AREAS_ID_POINTS_FAILURE,
} from "../actions/userActions"

const initialState = {
    currentUser: {},
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS:
            const {} = action.payload;
            return {
                ...state
            }
        case FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGIN_START:
            return {
                ...state, 
                loading: true,
                error: null,
                currentUser: {}
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                err: action.payload,
                load: false
            }
        case REGISTER_START:
            return {
                ...state,
                loading: true,
                error: null,
                currentUser: {}
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_SUCCESS:
            return {
                ...state,
                graphs: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
            case FETCH_GRAPH_ID_START:
                return {
                    ...state,
                    loading: true,
                    error: action.payload,
                }
    
            case FETCH_GRAPH_ID_SUCCESS:
                return {
                    ...state,
                    graphids: action.payload,
                    error: action.payload,
                    loading: false
                }
            case FETCH_GRAPH_ID_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
         case FETCH_GRAPH_ID_LINES_START:
             return {
                 ...state,
                 loading: true,
                 error: action.payload,
             }

         case FETCH_GRAPH_ID_LINES_SUCCESS:
             return {
                 ...state,
                 graphidlines: action.payload,
                 error: action.payload,
                 loading: false
             }
         case FETCH_GRAPH_ID_LINES_FAILURE:
             return {
                 ...state,
                 error: action.payload,
                 loading: false
             }
             
         case FETCH_GRAPH_ID_LINES_ID_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_ID_LINES_ID_SUCCESS:
            return {
                ...state,
                graphidlinesid: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_ID_LINES_ID_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }  
         case FETCH_GRAPH_ID_AREAS_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_ID_AREAS_SUCCESS:
            return {
                ...state,
                graphidareas: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_ID_AREAS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            } 
            
        case FETCH_GRAPH_ID_AREAS_ID_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_ID_AREAS_ID_SUCCESS:
            return {
                ...state,
                graphidareasid: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_ID_AREAS_ID_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            } 

        case FETCH_GRAPH_ID_LINES_ID_POINTS_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_ID_LINES_ID_POINTS_SUCCESS:
            return {
                ...state,
                graphidlinesidpoints: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_ID_LINES_ID_POINTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            } 

        case FETCH_GRAPH_ID_AREAS_ID_POINTS_START:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case FETCH_GRAPH_ID_AREAS_ID_POINTS_SUCCESS:
            return {
                ...state,
                graphidareasidpoints: action.payload,
                error: action.payload,
                loading: false
            }
        case FETCH_GRAPH_ID_AREAS_ID_POINTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            } 

        default:
            return state;



    }
}