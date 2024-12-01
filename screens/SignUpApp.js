import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { auth, db, facebookProvider, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const SignUpApp = () => {
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalMessage, setModalMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
 const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const fadeInValue = useSharedValue(10);
  const slideUpValue = useSharedValue(500);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeInValue.value, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      transform: [
        {
          translateY: withTiming(slideUpValue.value, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  useEffect(() => {
    fadeInValue.value = 1;
    slideUpValue.value = 0;
  }, []);

  // แก้ไข API URL ให้รองรับทุกการเชื่อมต่อ
 

  const handleSignUp = async () => {
    try {
      console.log('Starting signup process...');
      
      // Validation
      if (!accountName || !email || !password) {
        setModalType('แจ้งเตือน');
        Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบทุกช่อง', [{ text: 'ปิด', style: 'cancel' }]);
        return;
      }

      if (password !== confirmPassword) {
        setModalType('แจ้งเตือน');
        Alert.alert('แจ้งเตือน', 'รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านให้ตรงกัน', [{ text: 'ปิด', style: 'cancel' }]);
        return;
      }

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        accountName: accountName.trim(),
        email: email.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      Alert.alert('Success', 'ลงทะเบียนเรียบร้อยแล้ว', [
        { text: 'เข้าสู่ระบบ', onPress: () => navigation.navigate('LoginApp'), style: 'default' }
      ]);

    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('แจ้งเตือน', 'อีเมลนี้ถูกใช้ไปแล้ว', [{ text: 'ปิด', style: 'cancel' }]);
      } else {
        setModalType('แจ้งเตือน');
        Alert.alert('แจ้งเตือน', 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง', [{ text: 'ปิด', style: 'cancel' }]);
      }
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        accountName: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        userId: user.uid
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error("Facebook signup error:", error);
      Alert.alert('Signup Failed', 'Facebook signup failed. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        accountName: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        userId: user.uid
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error("Google signup error:", error);
      Alert.alert('Signup Failed', 'Google signup failed. Please try again.');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      setAccountName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('LoginApp');
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
            <Image source={require('../assets/User.png')} resizeMode="stretch" style={styles.image3} />
            <TextInput
              value={accountName}
              onChangeText={setAccountName}
              placeholder="Account Name"
              style={styles.input}
            />

            <View style={styles.column2}>
              <Image source={require('../assets/Email.png')} resizeMode="stretch" style={styles.image4} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input2}
              />
              <View style={styles.column3}>
                <Image source={require('../assets/Password Key.png')} resizeMode="stretch" style={styles.image5} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.input2}
                  
                />
                
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.input2}
                />
                
                <View style={styles.row}>
                  <View style={styles.signfrom}>
                    <TouchableOpacity onPress={handleFacebookSignUp}>
                      <Image
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png',
                        }}
                        resizeMode="stretch"
                        style={styles.buttonImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGoogleSignUp}>
                      <Image
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
                        }}
                        resizeMode="stretch"
                        style={styles.buttonImage2}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                      <Text style={styles.text2}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Comment}>
                    <Text style={styles.text3}>
                      We are committed to keeping your personal information safe. The data you provide will be securely stored and will not be shared with third parties without your consent. We use advanced security measures to protect your information at every step of the process.
                    </Text>
                  </View>
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
    width: 70,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF0CC',
    borderRadius: 50,
    marginTop: 10,
    marginLeft: '35%',
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
  },
  buttonImage2: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 18,
  },
  column: {
    height: 640,
    backgroundColor: '#40260CCC',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderWidth: 1,
    paddingTop: 27,
    paddingBottom: 283,
  },
  column2: {
    height: 545,
    backgroundColor: '#41260C99',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    padding: 12,
    marginTop: 5
  },
  column3: {
    height: 468,
    backgroundColor: '#40260CCC',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    marginTop: 5
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
  image4: {
    width: 20,
    height: 20,
    marginBottom: 5,
    marginLeft: 40,
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
    paddingLeft: 4
  },
  input2: {
    color: '#3B3030',
    fontSize: 14,
    marginBottom: 10,
    marginHorizontal: 30,

    backgroundColor: '#EAE7DB',
    borderRadius: 8,
    paddingLeft: 4,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 38,
    marginRight: 40,
    marginTop: 5
  },
  row: {
    height: 333,
    alignItems: 'flex-start',
    backgroundColor: '#2C1804',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    paddingLeft: 35,
    marginTop: 10
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
  signfrom: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
  text3: {
    color: '#AAB396',
    margin: '8%',
    textAlign: 'center',
    fontSize: 15,
    paddingRight: '10%'
  },
});

export default SignUpApp;
