import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Reset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, setActive } = useSignIn();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-50">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <View className="w-full max-w-md">
            <Text className="text-lg font-semibold mb-2">Email:</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Account email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            />
            <Pressable
              onPress={onRequestReset}
              className="h-12 bg-black rounded-lg flex justify-center items-center"
            >
              <Text className="text-white text-lg font-semibold">Send Reset Email</Text>
            </Pressable>
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <View className="w-full max-w-md">
            <Text className="text-lg font-semibold mb-2">Code:</Text>
            <TextInput
              value={code}
              placeholder="Code..."
              className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
              onChangeText={setCode}
            />
            <Text className="text-lg font-semibold mb-2">New Password:</Text>
            <View className="relative">
              <TextInput
                placeholder="New password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
              />
              <Pressable
                onPress={toggleShowPassword}
                className="absolute right-3 top-3"
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#aaa"
                />
              </Pressable>
            </View>
          </View>
          <Pressable
            onPress={onReset}
            className="my-4 h-12 w-full max-w-md bg-black rounded-lg flex justify-center items-center"
          >
            <Text className="text-white text-lg font-semibold">Set New Password</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Reset;