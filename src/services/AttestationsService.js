import axios from "axios";

const addAttestation = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/attestation`, request);
}

export {addAttestation};