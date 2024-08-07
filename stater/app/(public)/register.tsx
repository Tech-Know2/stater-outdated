import React, { useState } from 'react';
import { TextInput, View, Pressable, Text, Image } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState(''); // Changed to 'username'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        username,
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-6">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <Image
            source={require('../../assets/images/brand.png')}
            className='w-3/4 h-32 mb-6'
          />

          <View className="w-full max-w-md">
            <Text className="text-lg font-semibold mb-2">Email:</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Your email here"
              value={emailAddress}
              onChangeText={setEmailAddress}
              className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            />

            <Text className="text-lg font-semibold mb-2">Username:</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Your Username"
              value={username} // Updated to 'username'
              onChangeText={setUsername}
              className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            />

            <View className='flex flex-row justify-between mb-4'>
              <View className='w-1/2 pr-1'>
                <Text className="text-lg font-semibold mb-2">First Name:</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
                />
              </View>
              <View className='w-1/2 pl-1'>
                <Text className="text-lg font-semibold mb-2">Last Name:</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
                />
              </View>
            </View>

            <Text className="text-lg font-semibold mb-2">Password:</Text>
            <View className="relative mb-6">
              <TextInput
                placeholder="Your password here"
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

            <Pressable
              onPress={onSignUpPress}
              className="h-12 bg-black rounded-lg flex justify-center items-center"
            >
              <Text className="text-white text-lg font-semibold">Sign up</Text>
            </Pressable>
          </View>
        </>
      )}

      {pendingVerification && (
        <View className="w-full max-w-md">
          <Text className="text-lg font-semibold mb-2">Verification Code:</Text>
          <TextInput
            value={code}
            placeholder="Enter the code"
            className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            onChangeText={setCode}
          />
          <Pressable
            onPress={onPressVerify}
            className="h-12 bg-black rounded-lg flex justify-center items-center"
          >
            <Text className="text-white text-lg font-semibold">Verify Email</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Register;