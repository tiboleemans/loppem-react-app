import React, {useEffect, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";


function CustomButtonGroup(props) {

  const {subject, name, label, value, onChange, items, error = null} = props;

  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleButtonChange = (event, id) => {
    if (selected === id) {
      return;
    }
    event.target = {subject: subject, name: name, value: id, error: error};
    setSelected(id);
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
                className={`${item.id === selected ? 'inscription-button-group-selected' : ''}`}
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

export default CustomButtonGroup;
