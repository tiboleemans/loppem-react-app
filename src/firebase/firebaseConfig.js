import firebase from 'firebase/app' // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore';
import Axios from 'axios'

// Initialize Firebase
let config = {
	apiKey: "AIzaSyBRLr-oNqAfsWtXxrLxmyuXKsTdDSCbpP4",
	authDomain: "loppem-adf69.firebaseapp.com",
	databaseURL: "https://loppem-adf69.firebaseio.com",
	projectId: "loppem-adf69",
	storageBucket: "loppem-adf69.appspot.com",
	messagingSenderId: "170658684561",
	appId: "1:170658684561:web:0e098a3320808a4b4b6930",
	measurementId: "G-GVXLNJFSKB",
}

firebase.initializeApp(config)

const db = firebase.firestore()

export { Axios, db }