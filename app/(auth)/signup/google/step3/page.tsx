'use client';
import { GoogleSignupStep3 } from "@/app/components/auth/googleSignupComponents";

export default function SignUpStep3() {

    return (

        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='set-profile-logo'>Set Your Profile!</span>
            </div>
            <GoogleSignupStep3></GoogleSignupStep3>
            
        </>
    );

}