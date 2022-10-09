import {Axios} from "../firebase/firebaseConfig";
import Inscription from "../models/Inscription";

const apiPathInscription = 'https://europe-west1-loppem-adf69.cloudfunctions.net'

const registerStudent = (request) => {
    return Axios.post(
        `${apiPathInscription}/inscriptionSaveTemporary`,
        request
    ).then(({response}) => {
        Inscription.fromApi(response);
    })
};

export default registerStudent;
