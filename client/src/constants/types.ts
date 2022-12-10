import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export type User = {
    email: string
    password: string
}

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
