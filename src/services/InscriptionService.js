import Inscription from "../models/Inscription";
import axios from "axios";

const registerStudent = async (request) => {
    const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
    return await axios.post(
        `${apiPathInscription}/api/inscriptionSaveTemporary`,
        request
    ).then(({data}) => {
        console.log("registerStudent " + data.id + " nothing");
        Inscription.fromApi(data)
    });
}

const updateStudent = async (id, request) => {
    const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
    return await axios.post(
        `${apiPathInscription}/api/inscriptionSaveTemporary?${id}`,
        request
    );
}

const getInscription = async (id) => {
    const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
    return await axios.get(
        `${apiPathInscription}/api/inscriptionSaveGetTempInscription?id=${id}`
    ).then(({data}) => Inscription.fromApi(data))
}

export {registerStudent, updateStudent, getInscription};
