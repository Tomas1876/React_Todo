import { Input } from "../../style/common";
const CustomInput = (
        type : any = 'text', 
        label : string = '입력칸',
        name : string,
        placeholder : string = '값을 입력해주세요',
        minLength : number = 0, 
        maxLength : number = 524288,
        value : any, 
        onInput : React.FormEventHandler = (e)=>{ console.log(e) }
    ) => {
        return (
                <Input type={type} 
                        aria-label={label}
                        name={name}
                        placeholder={placeholder}
                        minLength={minLength}
                        maxLength={maxLength}
                        value={value}
                        onInput={onInput}
                />)
}

export default CustomInput;