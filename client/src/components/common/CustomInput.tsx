import { CustomInputProps } from "../../constants/types";
import { Input } from "../../style/common";

const CustomInput = ( props : CustomInputProps) => {
        
        let { label, ...rest } = props;
        /* FIXME 기본값을 지정하는 게 이게 최선일까? */
        if(!label) {
           label = '입력칸';
        }
        return (<>
                   <label htmlFor={props.id} >{label}</label>
                   <Input {...rest} />
                </>);
}

export default CustomInput;
