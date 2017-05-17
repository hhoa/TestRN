const INITIAL = {};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case 'loadSuccessfully':
      return action.payload;
    default:
      return state;
  }
};
