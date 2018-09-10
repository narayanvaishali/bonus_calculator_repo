import { ref, firebaseAuth } from "./firebase";

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  return firebaseAuth()
    .signOut()
    .then(res => {
      localStorage.removeItem("token");
    });
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user);
}

export function isAuthenticated() {
  if (localStorage.token) {
    //@TODO: Use token similar to JWT so that user information can be displayed

    return localStorage.token;
  }
}
