module.exports = function reducer(state = {}, action) {
  switch (action.type) {
    case 'NEW_COMMENT': {
        return {...state, ...action.payload}
    }
  }
  return state;
}
