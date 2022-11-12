import { Paragraph } from "../../style/common";

const CustomParagraph = ( 
        text : string = '', 
        theme : any = 'dark'
    ) => {
        console.log(text);
    return (
        <Paragraph theme={theme}>
            {text}
        </Paragraph>
    );

}
export default CustomParagraph;