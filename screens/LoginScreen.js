import React from 'react';
import { SafeAreaView, View, ScrollView, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleFacebookSignUp = () => {
    // TODO: Implement Facebook sign up logic
    console.log('Facebook sign up pressed');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up logic
    console.log('Google sign up pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/elic.jpg')}
            resizeMode="stretch"
            style={styles.mainImage}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('LoginApp')}
          >
            <Text style={styles.loginButtonText}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate('SignUpApp')}
          >
            <Text style={styles.signInButtonText}>SignUp</Text>
            
          </TouchableOpacity>

          <View flexDirection="row" marginTop={20} alignItems="center" justifyContent="center" >

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
                    </View>
                    
        </View>
      </ScrollView>
      
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FEF8E2",
    paddingTop: 33,
  },
  imageContainer: {
    height: 228,
    borderColor: "#5E27FC00",
    borderWidth: 1,
    marginBottom: 134,
    marginHorizontal: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    marginTop: 10,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bottomContainer: {
    height: 1500,
    backgroundColor: "#452A0D",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 50,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#E0DBC2",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#060606",
    marginVertical: 20,
    shadowColor: "#0B0B0B",
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#303233",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'FCQuantum',
  },
  signInButton: {
    height: 50,
    backgroundColor: "#AF9880",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: {
    color: "#303233",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'FCQuantum',
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    marginBottom: 20
  },
  buttonImage2: {
    width: 44,
    height: 44,
    marginHorizontal: 10,
    marginBottom: 20
  }
});

export default LoginScreen;
