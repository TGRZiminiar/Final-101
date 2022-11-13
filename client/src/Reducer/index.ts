import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    user:userReducer,
    drawer:drawerReducer,
});

export default rootReducer;