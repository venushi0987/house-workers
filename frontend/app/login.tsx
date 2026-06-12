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
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';


const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (Platform.OS === 'web') {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', user.role);
      }

      alert('Login successful!');
      router.replace('/(tabs)/home'); 
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed! Please try again.');
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
              source={require('../assets/login-bg.jpeg')}
              style={styles.topImage}
              resizeMode="cover"
            />
          </View>

          {/* App Name & Titles */}
          <View style={styles.headerContainer}>
            <Text style={styles.appNameText}>සුවCare</Text>
            <Text style={styles.welcomeTitle}>welcome back</Text>
            <Text style={styles.welcomeSubtitle}>Sign in to continue your care journey</Text>
          </View>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            
            {/* Email Field */}
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field */}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Forget Password Link */}
            <View style={styles.forgotPasswordRow}>
              <Text style={styles.footerText}>Forgot password? </Text>
              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text style={styles.registerLink}>Reset here</Text>
              </TouchableOpacity>
            </View>
            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Connecting...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Register Link Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerLink}>Register</Text>
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
  forgetPasswordContainer: {
    alignSelf: 'flex-end', 
    marginVertical: 5,
    marginBottom: 20,
  },
  forgetPasswordText: {
    color: '#B85C38',
    fontSize: 14,
    textDecorationLine: 'underline', 
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#B85C38', 
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B85C38',
    shadowOffset: { width: 0, height: 4 },
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
    marginTop: 20,
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

  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 20, // Login බටන් එකට උඩින් පොඩි ඉඩක් තියන්න
  },
});