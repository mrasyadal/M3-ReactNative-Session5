const init_state = {
  username: '',
};

export default (state = init_state, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return {...state, username: action.payload};
    case 'RESET_USERNAME':
      return {...init_state, username: ''};
    default:
      return state;
  }
};
