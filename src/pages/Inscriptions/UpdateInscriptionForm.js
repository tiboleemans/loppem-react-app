import React, {useState} from "react";
import useForm from "../../components/useForm";
import StudentInformationForm from "./StudentInformationForm";
import {updateStudent} from "../../services/InscriptionService";
import MyStyledPaper from "../../components/controls/MyStyledPaper";
import {MyStyledButton} from "../../components/controls/MyStyledButton";


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
      <div className="section bg-light-gray" id="inscription">
        <div className="container">
          <MyStyledPaper>
            <div className="section__header">
              <h2>Inschrijvingsformulier</h2>
            </div>
            <React.Fragment>
              {getContent()}
              <MyStyledButton
                variant="contained"
                onClick={sentInfo}
              > Update </MyStyledButton>
            </React.Fragment>
          </MyStyledPaper>
        </div>
      </div>
    </React.Fragment>
  );
}