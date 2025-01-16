import { GoogleSignupStep5 } from "@/app/components/auth/googleSignupComponents";

export default function SignUpStep5() {

    return(
        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='set-profile-logo'>Set Your Profile!</span>
            </div>
            <GoogleSignupStep5></GoogleSignupStep5>
        </>
    );
}