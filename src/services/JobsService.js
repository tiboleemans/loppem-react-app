import axios from "axios";

const jobsApply = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/jobs/apply`, request);
}

export {jobsApply};