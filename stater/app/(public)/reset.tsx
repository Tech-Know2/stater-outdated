import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Reset = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Reset</Text>
    </View>
  );
};

export default Reset;