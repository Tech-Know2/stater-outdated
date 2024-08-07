import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Exchange = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Exchange</Text>
    </View>
  );
};

export default Exchange;