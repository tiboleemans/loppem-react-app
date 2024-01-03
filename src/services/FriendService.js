import axios from "axios";

const claimDiscount = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/claim-discount`, request);
}

export {claimDiscount};