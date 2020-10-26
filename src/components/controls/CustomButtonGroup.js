import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {customButtonGroupStyling} from "./CustomStyling";
import FormHelperText from "@material-ui/core/FormHelperText";

function CustomButtonGroup(props) {

    const {name, label, value, onChange, items, error = null} = props;

    const [selected, setSelected] = useState(value);

    const handleButtonChange = (event, id) => {
        event.preventDefault();

        if (selected === id) {
            return;
        }

        event.target = {name: name, value: id};
        setSelected(id);
        onChange(event);
    };

    const changeStyleOfButton = (id) => {
        if (id === selected)
            return customButtonGroupStyling;
        else
            return {};
    }

    return (


        <FormControl {...(error && {error:true})}>
            <FormLabel component="legend" >{label}</FormLabel>
            <ButtonGroup fullWidth
                         name={name}
                         value={value}
                         style={{paddingTop: '10px'}}
            >

                {
                    items.map(
                        (item, index) => (
                            <Button
                                key={index}
                                style={changeStyleOfButton(item.id)}
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
