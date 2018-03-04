const Notifications = (state={}, action) => {
  switch (action.type){
    case 'NEW_COMMENT': {
      return {...state, ...action.payload};
    }
  }
  return state;
}

export default Notifications;
