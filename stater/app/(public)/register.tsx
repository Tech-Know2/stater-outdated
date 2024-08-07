import React, { useState } from 'react';
import { TextInput, View, Pressable, Text, Image } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <Image
            source={require('../../assets/images/brand.png')}
            className='scale-75'
          />

          <TextInput
            autoCapitalize="none"
            placeholder="Your email here"
            value={emailAddress}
            onChangeText={setEmailAddress}
            className="my-2 h-12 w-full max-w-md border border-gray-400 rounded p-2 bg-white text-black placeholder-gray-500"
          />

          <View className="relative w-full max-w-md">
            <TextInput
              placeholder="Your password here"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="my-2 h-12 w-full border border-gray-400 rounded p-2 bg-white text-black placeholder-gray-500"
            />
            <Pressable
              onPress={toggleShowPassword}
              className="absolute right-3 top-3 align-middle"
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
            className="my-4 h-12 w-full max-w-md bg-black rounded flex justify-center items-center"
          >
            <Text className="text-white text-lg">Sign up</Text>
          </Pressable>
        </>
      )}

      {pendingVerification && (
        <>
          <View className='w-1/2'>
            <TextInput
              value={code}
              placeholder="Code..."
              className="my-2 h-12 w-full max-w-md border border-gray-400 rounded p-2 bg-white text-black placeholder-gray-500"
              onChangeText={setCode}
            />
          </View>
          <Pressable
            onPress={onPressVerify}
            className="my-4 h-12 w-full max-w-md bg-black rounded flex justify-center items-center"
          >
            <Text className="text-white text-lg">Verify Email</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Register;