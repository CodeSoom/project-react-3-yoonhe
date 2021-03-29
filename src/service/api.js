import { authService } from '../firebase';
import { setFirebaseReset, setIsLoggedIn } from '../slice';

export const postSignup = ({ email, password }) => {
  authService.createUserWithEmailAndPassword(email, password);
};

export const postLogin = async ({ email, password }) => {
  await authService.signInWithEmailAndPassword(email, password);
};

export const getAuthentication = async (dispatch) => {
  await authService.onAuthStateChanged((user) => {
    dispatch(setFirebaseReset(false));
    const isLoggedIn = !!user;
    dispatch(setIsLoggedIn(isLoggedIn));
    dispatch(setFirebaseReset(true));
  });
};
