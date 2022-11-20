import React from "react";
import { Button } from "../../style/common";
import { CustomButtonProps } from "../../constants/types";

const CustomButton = ( props : CustomButtonProps) => {

        return (
            <Button {...props}>
                {props["aria-label"]}
            </Button>)
}
export default CustomButton;
