import { Button } from "../style/common";

const CustomButton = (
        type : any = 'button',
        label : string = '버튼',
        onClick : React.FormEventHandler = (e)=> { console.log(e) },
        theme : string = 'primary'
    ) => {
        return (
            <Button type={type}
                    aria-label={label}
                    onClick={onClick}
                    theme={theme}>
                {label}
            </Button>)
}
export default CustomButton;