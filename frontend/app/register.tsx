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
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../src/services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('customer'); // Default එක customer
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        phone,
        role
      });

      Alert.alert('Success', 'Account created successfully! Please login.');
      router.replace('/login');

    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      Alert.alert('Error', errorMsg);
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
            <Text style={styles.welcomeTitle}>create account</Text>
            <Text style={styles.welcomeSubtitle}>Sign up to start your care journey</Text>
          </View>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            
            {/* Full Name */}
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#A0A0A0"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email Address */}
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone Number */}
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Password */}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Role Selection (Customer vs Worker) */}
            <Text style={styles.inputLabel}>I want to:</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  role === 'customer' && styles.roleButtonActive
                ]}
                onPress={() => setRole('customer')}
              >
                <Text style={[
                  styles.roleButtonText, 
                  role === 'customer' && styles.roleButtonTextActive
                ]}>
                  Find a Caregiver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  role === 'worker' && styles.roleButtonActive
                ]}
                onPress={() => setRole('worker')}
              >
                <Text style={[
                  styles.roleButtonText, 
                  role === 'worker' && styles.roleButtonTextActive
                ]}>
                  Join as Worker
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Register</Text>
              )}
            </TouchableOpacity>

            {/* Login Link Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
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
    paddingBottom: 40,
  },
  imageWrapper: {
    width: '100%',
    height: 200, 
    borderBottomLeftRadius: 120, 
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  appNameText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#B85C38',
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 22,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 15,
  },
  roleButton: {
    flex: 0.48,
    height: 46,
    borderWidth: 1.5,
    borderColor: '#B85C38',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  roleButtonActive: {
    backgroundColor: '#B85C38',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B85C38',
  },
  roleButtonTextActive: {
    color: '#FFF',
  },
  loginButton: {
    backgroundColor: '#B85C38',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
});