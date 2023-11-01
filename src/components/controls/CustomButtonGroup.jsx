import React, {useEffect, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import {theme} from "../../theme";

function CustomButtonGroup(props) {

    const {subject, name, label, value, onChange, items, error = null} = props;

    const [selected, setSelected] = useState(value);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const handleButtonChange = (event, id) => {
        event.preventDefault();
        if (selected === id) {
            return;
        }
        event.target = {subject: subject, name: name, value: parse(id)};
        setSelected(id);
        onChange(event);
    };

    const parse = (value) => {
        if (value === 'yes') {
            return true;
        }
        if (value === 'no') {
            return false;
        }
        return value;
    }

    const customButtonGroupStyling = {
        color: 'white',
        variant: 'contained',
        backgroundColor: theme.palette.primary.main
    }

    const changeStyleOfButton = (id) => {
        if (id === selected)
            return customButtonGroupStyling;
        else
            return {};
    }

    return (
        <FormControl {...(error && {error: true})}>
            <FormLabel component="legend">{label}</FormLabel>
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
