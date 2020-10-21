import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//     selected: {
//         variant:'contained',
//         color:'primary'
//     }
// }))

const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px var(--box-shadow)',
    },
});

const blue = {
    '--background-start': '#2196F3',
    '--background-end': '#21CBF3',
    '--box-shadow': 'rgba(33, 203, 243, .3)',
};

const defaultColor = {
    '--background-start': '#FE6B8B',
    '--background-end': '#FF8E53',
    '--box-shadow': 'rgba(255, 105, 135, .3)',
};

function CustomButtonGroup(props) {

    const {name, label, value, onChange, items} = props;

    const [color, setColor] = useState(defaultColor);
    const [selected, setSelected] = useState(value);
    const classes = useStyles();

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
            return blue;
        else
            return defaultColor;
    }

    return (

        <FormControl>
            <FormLabel component="legend">{label}</FormLabel>
            <ButtonGroup fullWidth
                         name={name}
                         value={value}
            >

                {
                    items.map(
                        (item, index) => (
                            <Button className={classes.button} style={changeStyleOfButton(item.id)}
                                    value={item.id} label={item.title}
                                    onClick={(e) => handleButtonChange(e, item.id)}>{item.title}</Button>
                        )
                    )
                }
            </ButtonGroup>
        </FormControl>
    )
}

export default CustomButtonGroup;
