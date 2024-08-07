import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Settings = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;