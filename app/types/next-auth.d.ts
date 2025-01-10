import NextAuth from "next-auth";
import { decl } from "postcss";

declare module "next-auth" {
    interface User{
        userId? : string;
        password?: string;
        accessToken?: string;
    }
    interface Session {
        accessToken?: string;
    }
    interface JWT{
        accessToken?: string;
    }

    
}