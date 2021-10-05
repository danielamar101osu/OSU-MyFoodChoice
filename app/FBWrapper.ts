import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as firebase from 'firebase';
import { useEffect, useState } from 'react';
import User from '../User';
import { ModelObserver } from './ModelObserver';
import { UserModel } from './models/User-Model';

export class FBWrapper {

    private static mInstance = new FBWrapper();

    private mDatabase:FirebaseFirestoreTypes.Module;

    private constructor() {
        //Initialize Firebase..
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyBCjwYHTf9Yj1kAN7mByIhnA3rD0OZlzJY",
				authDomain: "osumyfoodchoiceapp-a8fd6.firebaseapp.com",
				databaseURL: "https://osumyfoodchoiceapp-a8fd6.firebaseio.com",
				projectId: "osumyfoodchoiceapp-a8fd6",
				storageBucket: "osumyfoodchoiceapp-a8fd6.appspot.com",
				messagingSenderId: "752614312654",
				appId: "1:752614312654:web:e3234a1c1c83e85a0dde9f",
				measurementId: "G-XKCPW0Q23G"
			});
		}

        this.mDatabase = firestore();
    }

    public static get instance() {
        return FBWrapper.mInstance;
    }

    public createUser(email:string,  password:string) {
        //TODO implement creation handles
        auth().createUserWithEmailAndPassword(email, password)
            .catch((reason) => {
                
            });
    }

    public loginUser(email:string,  password:string) {
        //TODO implement login error handles
        auth().signInWithEmailAndPassword(email, password)
            .catch((reason) => {

            });
    }

    /** Returns true if there is a user logged in via Firebase. False, otherwise. */
    public userIsLoggedIn() {
        return auth().currentUser == null;
    }

    /** Returns a model of the currently logged in user. 
     * @param mo a listener object that will be called on when the user model updates
    */
    public getUserData(mo:ModelObserver):UserModel {
        let um:UserModel = new UserModel();
    
        this.mDatabase.collection('users').doc(auth().currentUser.uid).onSnapshot({
            includeMetadataChanges:true
        },
        function (doc) {
            um.UID = auth().currentUser.uid;
            um.age = doc.data().age;
            um.buckIdCash = doc.data().buckIDCash;
            um.diningDollars = doc.data().diningDollars;
            um.dotNumber = doc.data().dotNumber;
            um.firstName = doc.data().firstName;
            um.heightInches = doc.data().height;
            um.lastName = doc.data().lastName;
            um.swipes = doc.data().swipes;
            um.weightLbs = doc.data().weight;
            um.allergies = doc.data().allergies;
            um.restrictions = doc.data().restrictions;

            mo.onModelUpdate();
        },
        function (error){

        }
            
        );
        
        mo.onModelUpdate();
        return um;
    }
    
}