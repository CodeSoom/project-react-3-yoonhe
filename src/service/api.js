import { authService, dbService } from '../firebase';
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

export const getRooms = async () => {
  const roomsDocument = await dbService.collection('rooms').get();

  let rooms = [];
  roomsDocument.forEach((document) => {
    const room = { ...document.data(), id: document.id };

    rooms = [...rooms, room];
  });

  return rooms;
};
