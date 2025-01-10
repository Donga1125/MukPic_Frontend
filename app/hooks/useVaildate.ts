import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";


export function UseVaildate<T>(schema: ZodObject<ZodRawShape>) {
    const [errors, setErrors] = useState<Partial<T>>();

    const validateField = (fieldName: string, value: string) => {
        setErrors({
            ...errors,
            [fieldName]: undefined
        });

        const parseValue = schema.pick({ [fieldName]: true }).safeParse({ [fieldName]: value });

        if (!parseValue.success) {
            setErrors({
                ...errors,
                ...parseValue.error.flatten().fieldErrors
            })
        }
    };

    return { errors, validateField };
}