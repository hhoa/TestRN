const SelectionReducer = (state = null, action) => {
  switch (action.type) {
    case 'select_kin':
      return action.payload;
    default:
      return state;
  }
};

export default SelectionReducer;
