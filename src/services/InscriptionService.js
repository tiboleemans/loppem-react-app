import Inscription from "../models/Inscription";
import axios from "axios";

const registerStudent = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  const registrationResponse = await axios.post(`${apiPathInscription}/api/registration`, request);
  return Inscription.fromApi(registrationResponse.data)

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
  const response = await axios.get(
    `${apiPathInscription}/api/inscriptionSaveGetTempInscription?id=${id}`
  )
  return Inscription.fromApi(response.data);
}

export {registerStudent, updateStudent, getInscription};
