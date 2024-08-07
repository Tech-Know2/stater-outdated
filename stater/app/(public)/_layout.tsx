import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
    return (
        <Stack 
            screenOptions={{
                headerStyle: {
                    backgroundColor:"#E5E7EB",
                },
                //headerTintColor?
                headerBackTitle: 'Back',
            }}
        >
            <Stack.Screen 
                name="login" 
                options={{ headerShown:false}}>
            </Stack.Screen>
            <Stack.Screen 
                name="register" 
                options={{ headerTitle:'Register an Account'}}>
            </Stack.Screen>
            <Stack.Screen 
                name="reset" 
                options={{ headerTitle:'Reset Your Password'}}>
            </Stack.Screen>
        </Stack>
    );
};

export default PublicLayout;