const Notifications = (state = {}, action) => {
  switch (action.type) {
    case "NEW_COMMENT": {
      return { ...state, ...action.payload };
    }
    case "ADD_COMMENT": {
      console.log(action);
      return { ...state, ...action };
    }
  }
  return state;
};

export default Notifications;
