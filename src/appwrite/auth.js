import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)     
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method 
                return this.login({email, password});               
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (!user) {
                // Try to get the current session
                const session = await this.account.getSession('current');
                if (!session) {
                    console.log("No active session found");
                    return null;
                }
                // If we have a session but no user, try to get the user again
                return await this.account.get();
            }
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            // If it's a session error, try to refresh the session
            if (error.type === 'user_session_required') {
                try {
                    const session = await this.account.getSession('current');
                    if (session) {
                        return await this.account.get();
                    }
                } catch (refreshError) {
                    console.log("Failed to refresh session:", refreshError);
                }
            }
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

