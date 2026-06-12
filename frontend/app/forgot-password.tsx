import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResultPassword = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('Password reset link has been sent to your email.');
      router.replace('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          
          {/* Top Curved Image Area */}
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../assets/login.png')} 
              style={styles.topImage}
              resizeMode="cover"
            />
          </View>

          {/* Title Area */}
          <View style={styles.headerContainer}>
            <Text style={styles.appNameText}>සුවCare</Text>
            <Text style={styles.welcomeTitle}>reset password</Text>
            <Text style={styles.welcomeSubtitle}>Enter your email to receive a reset link</Text>
          </View>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            
            {/* Email Field */}
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your registered email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Reset Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleResultPassword}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>

            {/* Back to Login Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.registerLink}>Login</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FAFAFA',
    paddingBottom: 30,
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    borderBottomLeftRadius: 180,
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  appNameText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#B85C38',
    marginBottom: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textTransform: 'lowercase',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#B85C38',
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#B85C38',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#B85C38',
    fontWeight: 'bold',
    fontSize: 14,
  },
});