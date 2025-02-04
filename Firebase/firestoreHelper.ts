// Firebase/firestoreHelper.ts

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { database } from '@/Firebase/firebaseSetup';
import { doc, deleteDoc } from 'firebase/firestore';

export interface goalData {
  text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (err) {
    console.log('Error adding document: ', err);
    throw err;
  }
}

export async function deleteFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document successfully deleted: ', id);
  } catch (err) {
    console.log('Error deleting document: ', err);
    throw err;
  }
}

export async function deleteAllFromDB(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log(`Successfully deleted all documents from ${collectionName}`);
  } catch (err) {
    console.log('Error deleting all documents: ', err);
    throw err;
  }
}
