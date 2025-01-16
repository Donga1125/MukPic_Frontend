'use client';
import { GoogleSignupStep4 } from "@/app/components/auth/googleSignupComponents";
export default function SignUpStep4() {



    return(
        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='set-profile-logo'>Set Your Profile!</span>
            </div>
            <GoogleSignupStep4></GoogleSignupStep4>
        </>
    )
}