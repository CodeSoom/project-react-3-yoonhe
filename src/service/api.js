import { authService, dbService } from './firebase';

export const postSignup = ({ email, password }) => {
  authService.createUserWithEmailAndPassword(email, password);
};

export const postLogin = async ({ email, password }) => {
  await authService.signInWithEmailAndPassword(email, password);
};

export const getAuthentication = async (authenticationDispatches) => {
  await authService.onAuthStateChanged((user) => {
    authenticationDispatches(user);
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
