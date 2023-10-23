import {styled} from "@mui/system";
import clsx from 'clsx';
import React from "react";

import {GlobalStyleTypography} from "./utilities/_typography";
import {GlobalStyleVariables} from "./_variables";


const GlobalCss = styled('div')(({theme}) => ({
  '& .MuiButton-root': GlobalStyleTypography.sx,
}));


export default GlobalCss;
