import {Axios} from "../firebase/firebaseConfig";
import Inscription from "../models/Inscription";

const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;

const registerStudent = (request) => {
    return Axios.post(
        `${apiPathInscription}/api/inscriptionSaveTemporary`,
        request
    ).then(({response}) => {
        Inscription.fromApi(response);
    })
};

const updateStudent = (id, request) => {
    return Axios.post(
        `${apiPathInscription}/api/inscriptionSaveTemporary?${id}`,
        request
    ).then(({response}) => {
        Inscription.fromApi(response);
    })
};

export {registerStudent, updateStudent};
