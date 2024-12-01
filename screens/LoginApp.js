import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, facebookProvider, googleProvider } from '../config/firebase';

const LoginApp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fadeInValue = useSharedValue(200);
  const slideUpValue = useSharedValue(400);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fadeInValue.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }),
    transform: [{
      translateY: withTiming(slideUpValue.value, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
    }],
  }));

  useEffect(() => {
    fadeInValue.value = 1;
    slideUpValue.value = 0;
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful:', user.email);
      setIsLoggedIn(true);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
      }
      
      Alert.alert('Login Failed', errorMessage);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Facebook login success:", user);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Facebook login error:", error);
      Alert.alert('Login Failed', 'Facebook login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google login success:", user);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert('Login Failed', 'Google login failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[animatedStyle]}>
          <View style={styles.view}>
            <Image source={require('../assets/elic.jpg')} resizeMode="stretch" style={styles.image2} />
          </View>

          <View style={styles.view2}>
            <Text style={styles.text}>Welcome to Study</Text>
          </View>

          <View style={styles.column}>
            <Image source={require('../assets/Email.png')} resizeMode="stretch" style={styles.image3} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
            />

            <View style={styles.column2}>
              <Image source={require('../assets/Password Key.png')} resizeMode="stretch" style={styles.image5} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input2}
              />
              <TouchableOpacity>
                <Text style={styles.textForgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <View style={styles.row}>
                <View style={styles.signfrom}>
                  <TouchableOpacity onPress={handleFacebookLogin}>
                    <Image
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png',
                      }}
                      resizeMode="stretch"
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleGoogleLogin}>
                    <Image
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
                      }}
                      resizeMode="stretch"
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.text2}>SignIn</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.Comment}>
                  <Text style={styles.text3}>
                    Welcome to ELIC! Learn English in a fun and easy way
                    with our AI chatbot and exciting games.
                    Whether you're just starting or looking
                    to improve, ELIC makes learning enjoyable.
                    Chat with the AI to practice real conversations,
                    and play games that make learning feel like fun.
                    Join us, and turn your English journey into an
                    exciting adventure!
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: '100%' }}>
                  <Image source={require('../assets/talk.png')} resizeMode="stretch" style={styles.image10} />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginLeft: '35%',
    width: 70,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF0CC',
    borderRadius: 50,
    marginTop: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginBottom: 40,
    marginLeft: 10,
  },
  column: {
    marginTop: '20%',
    backgroundColor: '#40260CCC',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderWidth: 1,
    paddingTop: 27,
    paddingBottom: 283,
  },
  column2: {
    backgroundColor: '#41260C99',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    padding: 12,
  },
  image2: {
    width: 70,
    height: 70,
  },
  image3: {
    width: 20,
    height: 20,
    marginBottom: 7,
    marginLeft: 50,
  },
  image5: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: 40,
  },
  input: {
    color: '#3B3030',
    fontSize: 14,
    marginBottom: 10,
    marginHorizontal: 40,
    marginLeft: 50,
    marginRight: 54,
    
    backgroundColor: '#EAE7DB',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    paddingLeft: 4,
    alignItems: 'center',
    
  },
  input2: {
    color: '#3B3030',
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 30,
    
    backgroundColor: '#EAE7DB',
    borderRadius: 8,
    paddingLeft: 4,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 38,
    marginRight: 41,
    marginTop: 8,
    alignItems: 'center'
  },
  row: {
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#2C1804',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    paddingLeft: 35,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FEF8E2',
  },
  text: {
    color: '#493816',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 39,
  },
  text2: {
    color: '#303233',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  view: {
    marginTop: '10%',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#FFFFFF00',
    padding: 12,
    marginBottom: 30,
  },
  view2: {
    height: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF00',
    paddingHorizontal: 12,
  },
  Comment: {
    marginTop: 20,
    marginHorizontal: 20,
    alignSelf: 'center',
    paddingRight: 40
  },
  text3: {
    color: '#AAB396',
    textAlign: 'center',
    fontSize: 15,
  },
  signfrom: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
  textForgotPassword: {
    color: '#AAB396',
    textAlign: 'right',
    fontSize: 15,
    marginBottom: 10,
    marginRight: 60,
  },
  image10: {
    width: 300,
    height: 300,
    marginTop: '3%',
  }
});

export default LoginApp;
