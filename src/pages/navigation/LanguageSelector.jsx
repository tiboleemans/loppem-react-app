import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import {changeLanguage, getLanguage} from "../../i18n/i18nSetup";
import {NativeSelect} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";

export default function LanguageSelector() {
        const history = useHistory()

    const handleChange = (event) => {
            history.push('/'+event.target.value.substring(0, 2));
    };

    const lang = getLanguage();

    return (
        <FormControl fullWidth>
            <NativeSelect
                id="demo-simple-select"
                value={lang}
                label="language"
                onChange={handleChange}
                disableUnderline
            >
                <option value={'nl-BE'}>NL</option>
                <option value={'fr-BE'}>FR</option>
                <option value={'en-US'}>EN</option>
            </NativeSelect>
        </FormControl>
    );
}
