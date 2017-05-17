const INITIAL = {};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case 'CreateFavorite':
      return INITIAL;
    default:
      return state;
  }
};
