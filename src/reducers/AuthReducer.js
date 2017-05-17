const INITIAL = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case 'checkEmail':
      return { ...state, email: action.payload };
    case 'checkPassword':
      return { ...state, password: action.payload };
    case 'logInSuccessfully':
      return { ...state, ...INITIAL, user: action.payload };
    case 'logInFailed':
      return { ...state, error: 'Lỗi rồi nè', loading: false };
    case 'loading':
      return { ...state, error: false, loading: action.payload };
    default:
      return state;
  }
};
