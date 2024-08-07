import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Transfer = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Transfer</Text>
    </View>
  );
};

export default Transfer;