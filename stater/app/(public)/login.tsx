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

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-6">
      <Spinner visible={loading} />

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
          onPress={onSignInPress}
          className="h-12 bg-black rounded-lg flex justify-center items-center mb-4"
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
        </Pressable>

        <Link href="/reset" asChild>
          <Pressable className="mb-2">
            <Text className="text-black text-center text-lg my-3 mb-2">Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable>
            <Text className="text-black text-center text-lg">Create Account</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Login;