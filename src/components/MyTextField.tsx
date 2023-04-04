import { Tooltip, TextFieldProps, InputAdornment, FilledTextFieldProps, OutlinedTextFieldProps, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React from 'react'
interface MyTextFieldProps  {
    handleclear: (event:any) => void,
} 
// & StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;
// const clear = function (name: string) {
//     let funName = "set" + name;
//     let funCall = funName + "('')";
//     return eval(funCall);
// };
const MyTextField : React.FC<MyTextFieldProps & TextFieldProps > = props => {
    let {handleclear}=props;
    // const clear = function () {
    //     let funName = "set" + props.label;
    //     let funCall = funName;
    //     // 
    //     return [funCall];
    // };
    return (

        <TextField {...props}
           
            InputProps={{
                startAdornment: props.InputProps?.startAdornment,
             
                endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id={props?.id + "c"} sx={{ visibility: props?.value ? "visible" : "hidden" }}><ClearIcon /></IconButton></Tooltip>,
            }}
        >
            {props.children}
        </TextField>
    );

}

export default MyTextField;
