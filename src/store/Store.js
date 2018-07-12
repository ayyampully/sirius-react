import {createStore, combineReducers} from 'redux';

import Notifications from '../reducers/Notifications';

const reducers = combineReducers({
  notification: Notifications
})

const Store = createStore(reducers);

export default Store;
