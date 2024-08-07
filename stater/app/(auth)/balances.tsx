import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Balances = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Balances</Text>
    </View>
  );
};

export default Balances;