import { v4 as uuidv4 } from 'uuid';

import { authService, dbService, storageService } from './firebase';

export async function postSignup({ email, password }) {
  await authService.createUserWithEmailAndPassword(email, password);
}

export async function postLogin({ email, password }) {
  await authService.signInWithEmailAndPassword(email, password);
}

export function getAuthentication() {
  return new Promise((resolve) => {
    authService.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

export async function getRooms() {
  const roomsDocument = await dbService.collection('rooms').get();

  let rooms = [];
  roomsDocument.forEach((document) => {
    const room = { ...document.data(), id: document.id };

    rooms = [...rooms, room];
  });

  return rooms;
}

export async function getSavedFileLink(image) {
  const storageRef = await storageService.ref().child(`images/${uuidv4()}`);
  const response = await storageRef.putString(image, 'data_url');
  const getUrl = await response.ref.getDownloadURL();

  return getUrl;
}

export async function postRoom(fields) {
  await dbService.collection('rooms').add(fields);
}
