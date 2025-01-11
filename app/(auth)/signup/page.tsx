'use client';
import { SignupStep } from "@/app/components/auth/signupComponents";

export default function SignUp() {


    return (

        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='login-logo'>MUKPIC</span>
            </div>
            <SignupStep></SignupStep>
        </>
        
    )


    
}