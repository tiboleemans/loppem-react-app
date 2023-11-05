import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getInscription} from "../../services/InscriptionService";
import UpdateInscriptionForm from "./UpdateInscriptionForm";
import MyStyledPaper from "../../components/controls/MyStyledPaper";

export default function UpdateInscription() {

  const [values, setValues] = useState('');

  let {id} = useParams();

  useEffect(() => {
    const inscription = getInscription(id);
    setValues(inscription);
    setValues({
      ...values,
      id: id
    })
  }, [id])


  // const {inscription, isLoading} = useQuery(["inscriptions", 'UtFrNwgcDIUv0s2TZNJB'], () => getInscription('UtFrNwgcDIUv0s2TZNJB'));
  // const inscription = getInscription('UtFrNwgcDIUv0s2TZNJB')
  // if(isLoading) {
  //     return <h1>Loading...</h1>
  // }
  // setValues(inscription);

  return (
    <React.Fragment>
      <div className="section bg-light-gray" id="inscription">
        <div className="container">
          <MyStyledPaper>
            <div className="section__header">
              <h2>Inschrijvingsformulier</h2>
              <UpdateInscriptionForm initialForm={values}/>
            </div>
          </MyStyledPaper>
        </div>
      </div>
    </React.Fragment>
  )
}