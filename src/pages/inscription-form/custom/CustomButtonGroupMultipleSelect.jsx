import React, {useState} from 'react';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonGroup from "@mui/material/ButtonGroup";


function CustomButtonGroupMultipleSelect(props) {

  const {subject, name, label, value, onChange, items, error = null} = props;

  const [selected, setSelected] = useState(value);

  const handleButtonChange = (event, id) => {
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id);
    }
    event.target = {subject: subject, name: name, value: selected, error: error};
    setSelected(selected);
    onChange(event);
  };

  return (
    <FormControl {...(error && {error: true})}>
      <FormLabel component="legend">{label}</FormLabel>
      <ButtonGroup fullWidth name={name} value={value}>
        {
          items.map(
            (item, index) => (
              <Button
                key={index}
                className={`${selected.has(item.id) ? 'inscription-button-group-selected' : ''}`}
                value={item.id} label={item.title}
                onClick={(e) => handleButtonChange(e, item.id)}>{item.title}
              </Button>
            )
          )
        }
      </ButtonGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default CustomButtonGroupMultipleSelect;
