import { Tabs } from 'expo-router';
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

// Logout button component
export const LogoutButton = () => {
    const { signOut } = useAuth();
  
    const doLogout = () => {
      signOut();
    };
  
    return (
      <Pressable onPress={doLogout} style={{ marginRight: 15 }}>
        <AntDesign name="logout" size={20}/>
      </Pressable>
    );
  };

const TabsPage = () => {
    const {isSignedIn} = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
            }}>
            <Tabs.Screen name="home" options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                tabBarLabel: 'Home',
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen name="balances" options={{
                title: 'Balances',
                tabBarIcon: ({ color, size }) => <MaterialIcons name="account-balance-wallet" size={size} color={color} />,
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen name="reports" options={{
                title: 'Reports',
                tabBarIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen name="transfer" options={{
                title: 'Transfer',
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bank-transfer" size={size} color={color} />,
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen name="exchange" options={{
                title: 'Exchange',
                tabBarIcon: ({ color, size }) => <MaterialIcons name="currency-exchange" size={size} color={color} />,
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen name="settings" options={{
                title: 'User Settings',
                tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
                headerRight: () => <LogoutButton />,
            }}
                redirect={!isSignedIn}
            />
        </Tabs>
    )
}

export default TabsPage;