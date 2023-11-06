import React, {useState} from "react";
import useForm from "../useForm";
import StudentInformationForm from "../steps/StudentInformationForm";
import {updateStudent} from "../../../services/InscriptionService";


export default function UpdateInscriptionForm() {
  const {
    values,
    handleInputChange
  } = useForm();

  const [errors, setErrors] = useState({});

  function getContent() {
    return <StudentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
  }

  const sentInfo = () => {
    // setIsLoading(true);
    // values.parent.siteLanguage = getLanguage();
    const update = updateStudent(values.id, values);
    // setIsLoading(false)
  }


  return (
    <React.Fragment>
      <div className="inscription-card" id="inscription">
        <div className="container">
          <h2>Inschrijvingsformulier</h2>
          <React.Fragment>
            {getContent()}
            <div className="inscription-button"
                 onClick={sentInfo}
            > Update
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
}