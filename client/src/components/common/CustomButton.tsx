import { Button } from "../../style/common";

const CustomButton = (
        type : any = 'button',
        label : string = '버튼',
        disabled : boolean,
        theme : string = 'primary',
        onClick : React.FormEventHandler = (e)=> { console.log(e) }
    ) => {
        console.log(disabled);
        return (
            <Button type={type}
                    aria-label={label}
                    disabled={disabled}
                    theme={theme}
                    onClick={onClick}>
                {label}
            </Button>)
}
export default CustomButton;