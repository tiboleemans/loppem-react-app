import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function CustomSelect(props) {

    const {name, labelId, labelText, value, onChange, items} = props;
    return (

        <FormControl variant="outlined">
            <InputLabel id={labelId}>{labelText}</InputLabel>
            <Select
                labelId={labelId}
                id={name}
                name={name}
                value={value}
                label={labelText}
                onChange={onChange}
            >

                {
                    items.map(
                        (item, index) => (
                            <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                        )
                    )
                }
            </Select>
        </FormControl>
    )
}

export default CustomSelect;
