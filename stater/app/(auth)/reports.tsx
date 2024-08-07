import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Reports = () => {
  const { user } = useUser();

  return (
    <View className='flex justify-center items-center'>
      <Text>Reports</Text>
    </View>
  );
};

export default Reports;