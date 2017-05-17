import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const watchEmail = (text) => {
  return (
    {
      type: 'checkEmail',
      payload: text
    }
  );
};

export const watchPassword = (text) => {
  return (
    {
      type: 'checkPassword',
      payload: text
    }
  );
};

export const logInPress = (email, password) => {
  return (
    (dispatch) => {
      dispatch({ type: 'loading', payload: true });
      firebase.auth().signInWithEmailAndPassword(email, password)
              .then(user => logInSuccessfully(dispatch, user))
              .catch(() => dispatch({ type: 'logInFailed' }));
    }
  );
};

const logInSuccessfully = (dispatch, user) => {
  dispatch({ type: 'logInSuccessfully', payload: user });
  Actions.Main();
};

export const loadData = () => {
  return (
    (dispatch) => {
      firebase.database().ref('/kindergartens')
        .on('value', snapshot => {
          dispatch({ type: 'loadSuccessfully', payload: snapshot.val() });
        });
    }
  );
};

export const selectKinder = (kinderID) => {
  return ({
    type: 'select_kin',
    payload: kinderID
  });
};

export const favPressedCreate = (kinderID, val) => {
  const { currentUser } = firebase.auth();
  return (
    (dispatch) => {
      firebase.database().ref(`/kindergartens/${kinderID}/users`)
              .set({ [currentUser.uid]: val })
              .then(() => {
                dispatch({ type: 'CreateFavorite' });
              })
              .catch((err) => {
                console.log(err);
              });
    }
  );
};

export const changeContent = (typeContent) => {
  return (
    {
      type: 'checkTypeContent',
      payload: typeContent
    }
  );
};
