import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Spinner visible={loading} />

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
        onPress={onSignInPress}
        className="my-4 h-12 w-full max-w-md bg-black rounded flex justify-center items-center"
      >
        <Text className="text-white text-lg">Login</Text>
      </Pressable>

      <Link href="/reset" asChild>
        <Pressable className="my-2">
          <Text className="text-gray-600">Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable className="my-2">
          <Text className="text-gray-600">Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;