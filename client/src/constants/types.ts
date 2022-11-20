import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

/* FIXME 전역으로 선언하고 싶지 않은데 어디에 선언해야 가장 좋을까? */
export type TodoType = {
    id: string
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string
}

export type CustomSize = {
                width?: string,
                height?: string,
                'font-size'?: string
}

export type CustomInputProps = {
                    label: string
                } & CustomSize & InputHTMLAttributes<HTMLElement>;
export type CustomButtonProps = {
                    theme: string
                } & CustomSize & ButtonHTMLAttributes<HTMLElement>; 
