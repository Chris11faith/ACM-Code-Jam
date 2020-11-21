import firebase from 'firebase/app';
import dayjs from 'dayjs';
import 'firebase/auth';
import 'firebase/firestore';

export class Note {
  constructor(id, title, owner, shared=false, createdDate=null) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.shared = shared;
    this.createdDate = createdDate;
  }

  displayCreatedDate() {
    return formatDate(this.createdDate);
  }
}

export const noteConverter = {
  toFirestore: function(note) {
    var createdDate;
    if (this.createdDate === null) {
      createdDate = firebase.firestore.Timestamp.now();
    } else {
      createdDate = firebase.firestore.Timestamp.fromDate(this.createdDate);
    }

    return {
      id: this.id,
      title: this.title,
      owner: this.owner,
      shared: this.shared,
      createdDate: createdDate
    }
  },

  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new Note(id, data.title, data.owner, data.shared, data.createdDate?.toDate());
  }
}

export class Group {
  constructor(id, title, password=null, createdDate=null) {
    this.id = id;
    this.title = title;
    this.password = password;
    this.createdDate = createdDate;
  }

  displayCreatedDate() {
    return formatDate(this.createdDate);
  }
}

export const groupConverter = {
  toFirestore: function(group) {
    var createdDate;
    if (this.createdDate === null) {
      createdDate = firebase.firestore.Timestamp.now();
    } else {
      createdDate = firebase.firestore.Timestamp.fromDate(this.createdDate);
    }

    return {
      id: this.id,
      title: this.title,
      password: this.password,
      createdDate: createdDate
    }
  },

  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new Group(id, data.title, data.password, data.createdDate?.toDate())
  }
}

const config = {
  apiKey: "AIzaSyBO9GG7J2l1dHlAZS0rTEZvRVbsh1wPXN4",
  authDomain: "acm-cornell-notes.firebaseapp.com",
  databaseURL: "https://acm-cornell-notes.firebaseio.com",
  projectId: "acm-cornell-notes",
  storageBucket: "acm-cornell-notes.appspot.com",
  messagingSenderId: "793073991242",
  appId: "1:793073991242:web:5204c52a5e3fa5a2fdb0b3",
  measurementId: "G-8F73EGM16Z"
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export const toDate = (date) => {
  return formatDate(date.toDate());
}

export const formatDate = (date) => {
  return dayjs(date).format('M/D/YYYY h:mm:ss A');
}

export default firebase;
