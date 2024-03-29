import axios from "axios";

const sendInterestMail = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/mail/interest`, request);
}

const sendQuestionMail = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/mail/question`, request);
}

const sendCodeMail = async (request) => {
  const apiPathInscription = process.env.REACT_APP_API_ENDPOINT;
  return await axios.post(`${apiPathInscription}/api/mail/code`, request);
}

export {sendInterestMail, sendQuestionMail, sendCodeMail};