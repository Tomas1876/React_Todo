import { Paragraph } from "../../style/common";

const CustomParagraph = ( 
        text : string = '', 
        theme : any = 'dark'
    ) => {

    return (
        <Paragraph theme={theme}>
            {text}
        </Paragraph>
    );

}
export default CustomParagraph;