import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Home = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Welcome, {user?.username}!</Text>
    </View>
  );
};

export default Home;