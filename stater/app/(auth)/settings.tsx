import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Settings = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center w-full mt-8 mx-8'>
      <Text className='font-semibold mx-8 text-lg my-4'>Profile Settings</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Account Settings</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Notification Settings</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Integration Settings</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Privacy Settings</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Help & Support</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>App Preferences</Text>
      <Text className='font-semibold mx-8 text-lg my-4'>Legal & Compliance</Text>
    </View>
  );
};

export default Settings;

/*
GitHub Profile tutorial link https://github.com/Galaxies-dev/react-native-clerk-auth/blob/main/app/(auth)/profile.tsx

const onSaveUser = async () => {
    try {
      const result = await user.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    }
  };
*/