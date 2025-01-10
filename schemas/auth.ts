import { z } from 'zod';

export const emailSchema = z.object({
    email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
});




export const userSchema = z.object({
    userId: z
        .string()
        .min(4, { message: '아이디는 4자 이상이어야 합니다.' })
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: '최소 한 개의 영문자가 포함되어야 합니다.',
        })
        .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
            message: '영문자와 숫자만 포함해야 합니다.',
        }),
        password: z
        .string()
        .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
        .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: '최소 한 개의 알파벳이 포함되어야 합니다.',
        })
        .refine((val) => /\d/.test(val), {
            message: '최소 한 개의 숫자가 포함되어야 합니다.',
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: '최소 한 개의 특수문자가 포함되어야 합니다.',
        }),
    
});

export const userNameSchema = z.object({
    userName: z
        .string()
        .min(2, { message: '이름은 2자 이상이어야 합니다.' })
        .max(20, { message: '이름은 20자 이하여야 합니다.' })
        .refine((val) => /^[a-zA-Z가-힣]+$/.test(val), {
            message: '이름은 한글 또는 영어로만 구성되어야 합니다.',
        }),
});