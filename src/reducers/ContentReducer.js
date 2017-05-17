const INITIAL = {
  typeC: 0
};

export default (state = INITIAL.typeC, action) => {
  switch (action.type) {
    case 'checkTypeContent':
      return action.payload;
    default:
      return state;
  }
};
