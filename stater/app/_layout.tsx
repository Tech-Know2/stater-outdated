import { Stack, useRouter, useSegments } from "expo-router"
import { Slot } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import { useAuth, ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useEffect } from "react";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    }
}

const InitialLayout = () => {
    const {isSignedIn, isLoaded} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if(!isLoaded) return;

        const inTabsGroup = segments[0] === '(auth)';

        console.log('isSignedIn', isSignedIn)

        if (isSignedIn && !inTabsGroup) {
            router.replace('/home');
        } else if (!isSignedIn) {
            router.replace('/login');
        }

    }, [isSignedIn]);

    return (
        <Slot />
    )
}

const RootStackLayout = () => {
    return (

        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
            <InitialLayout />
        </ClerkProvider>
    )
}

export default RootStackLayout;