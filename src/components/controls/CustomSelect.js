import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

function CustomSelect(props) {

    const {name, labelId, labelText, value, onChange, items, error} = props;
    return (

        <FormControl variant="outlined" {...(error && {error:true})}>
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
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}

export default CustomSelect;
