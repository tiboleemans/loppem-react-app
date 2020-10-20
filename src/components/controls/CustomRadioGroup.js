import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

function CustomRadioGroup(props) {

    const {name, label, value, onChange, items} = props;
    return (

        <FormControl>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row
                        name={name}
                        value={value}
                        onChange={onChange}
                        >

                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel value={item.id} control={<Radio/>} label={item.title}/>
                        )
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}

export default CustomRadioGroup;
