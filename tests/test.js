const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'acm-cornell-notes';

const myId = "testing_user";
const testDoc = 'test_document';
const theirId = "not_testing_user";
const myAuth = { uid: myId, email: 'test@test.com' };
const theirAuth = { uid: theirId, email: 'not@you.com' };

function getFirestore(auth) {
  return firebase.initializeTestApp({
    projectId: MY_PROJECT_ID,
    auth: auth
  }).firestore();
}

describe("Firestore Rules", () => {
  it("Asserts true to true", () => {
    assert(true);
  });

  it("Blocks unauthenticated database reads", async () => {
    const db = getFirestore(null);

    const testRead = db.collection('users').doc(myId);

    await firebase.assertFails(testRead.get());
  });

  it("Blocks unauthenticated database writes", async () => {
    const db = getFirestore(null);

    const newUser = db.collection('users').doc(myId);

    await firebase.assertFails(newUser.set({
      name: 'Test'
    }));
  });

  it("Allows authenticated users to create user accounts", async () => {
    const db = getFirestore(myAuth);

    const newUser = db.collection('users').doc(myId);
    await firebase.assertSucceeds(newUser.set({
      name: 'Test'
    }));
  });

  it("Blocks authenticated users from modifying other users", async () => {
    const db = getFirestore(myAuth);

    const newUser = db.collection('users').doc(theirId);
    await firebase.assertFails(newUser.set({
      name: 'Test'
    }));
  });

  it("Allows users to create notes", async () => {
    const db = getFirestore(myAuth);

    const newNote = db.collection('users')
                      .doc(myId)
                      .collection('notes')
                      .doc(testDoc);

    await firebase.assertSucceeds(newNote.set({
      content: 'Test'
    }));
  });

  it("Allows owner to read note", async () => {
    const db = getFirestore(myAuth);

    const readNote = db.collection('users')
                       .doc(myId)
                       .collection('notes')
                       .doc(testDoc);

    await firebase.assertSucceeds(readNote.get());
  });

  it("Disallows users from reading other users groups", async () => {
    const db = getFirestore(myAuth);

    const readNote = db.collection('users')
                       .doc(theirId)
                       .collection('notes')
                       .doc(testDoc);

    await firebase.assertFails(readNote.get());
  })

  it("Allows users to create groups", async () => {
    const db = getFirestore(myAuth);

    const group = db.collection('groups')
                       .doc('groupCode');

    await firebase.assertSucceeds(group.set({
      owner: myAuth.uid,
      name: 'Test'
    }));

  });

  it("Allows users to create notes in groups", async () => {
    const db = getFirestore(myAuth);

    const note = db.collection('groups')
                    .doc('groupCode')
                    .collection('notes')
                    .doc(testDoc);

    await firebase.assertSucceeds(note.set({
      title: 'Test',
      owner: myAuth.uid,
      shared: false
    }));

  });

  it("Allows other users to create notes in groups they didn't create", async () => {
    const db = getFirestore(myAuth);
    const anotherUser = getFirestore(theirAuth);
    const otherGroupName = 'anotherGroup';

    const anotherGroup = anotherUser.collection('groups')
                           .doc(otherGroupName);

    await firebase.assertSucceeds(anotherGroup.set({
      owner: theirAuth.uid
    }));

    const myNote = db.collection('groups')
                     .doc(otherGroupName)
                     .collection('notes')
                     .doc('anotherNote');

    await firebase.assertSucceeds(myNote.set({
      owner: myAuth.uid,
      shared: false
    }));

  });

  it("Allows users to read shared notes in groups", async () => {
    const db = getFirestore(myAuth);
    const anotherUser = getFirestore(theirAuth);

    const myNote = db.collection('groups')
                     .doc('groupCode')
                     .collection('notes')
                     .doc('anotherNote');

    await firebase.assertSucceeds(myNote.set({
      owner: myAuth.uid,
      shared: true
    }));

    const readFromOtherUser = anotherUser
      .collection('groups')
      .doc('groupCode')
      .collection('notes')
      .doc('anotherNote');

    await firebase.assertSucceeds(myNote.get())
  });

  it("Doesn't allow users to read unshared notes in groups", async () => {
    const db = getFirestore(myAuth);
    const anotherUser = getFirestore(theirAuth);
    const unsharedNote = 'unshared_note';

    const myNote = db.collection('groups')
                     .doc('groupCode')
                     .collection('notes')
                     .doc(unsharedNote);

    await firebase.assertSucceeds(myNote.set({
      owner: myAuth.uid,
      shared: false
    }));

    const readFromOtherUser = anotherUser
      .collection('groups')
      .doc('groupCode')
      .collection('notes')
      .doc(unsharedNote);

    await firebase.assertFails(readFromOtherUser.get())
  });

  it("Allows me to read an unshared note I created", async () => {
    const db = getFirestore(myAuth);
    const unsharedNote = 'unshared_note';

    const myNote = db.collection('groups')
                     .doc('groupCode')
                     .collection('notes')
                     .doc(unsharedNote);

    await firebase.assertSucceeds(myNote.set({
      owner: myAuth.uid,
      shared: false
    }));

    await firebase.assertSucceeds(myNote.get());
  });

  it("Doesn't allow unauthenticated users to read notes", async () => {
    const db = getFirestore(myAuth);
    const unAuthDb = getFirestore();
    const sharedNote = 'shared_note';

    const myNote = db.collection('groups')
                     .doc('groupCode')
                     .collection('notes')
                     .doc(sharedNote);

    await firebase.assertSucceeds(myNote.set({
      owner: myAuth.uid,
      shared: true
    }));

    const tryReadNote = unAuthDb.collection('groups')
                     .doc('groupCode')
                     .collection('notes')
                     .doc(sharedNote);

    await firebase.assertFails(tryReadNote.get());

  });
})

