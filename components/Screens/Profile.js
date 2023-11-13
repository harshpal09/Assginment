import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const url = 'http://dev3.xicom.us/xttest/savedata.php';

export default function Profile({ route }) {
  const { image } = route.params;

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [Success, setSuccess] = useState('')

  const [validationErrors, setValidationErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!userDetails.first_name) {
      errors.first_name = 'First Name is required';
      isValid = false;
    }

    if (!userDetails.last_name) {
      errors.last_name = 'Last Name is required';
      isValid = false;
    }

    if (!userDetails.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(userDetails.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!userDetails.phone) {
      errors.phone = 'Phone is required';
      isValid = false;
    }

    setValidationErrors(errors);

    return isValid;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
      formData.append('first_name', userDetails.first_name);
      formData.append('last_name', userDetails.last_name);
      formData.append('email', userDetails.email);
      formData.append('phone', userDetails.phone);
      formData.append('user_image', {
        uri: image,
        type: 'image/jpeg', 
        name: 'user_image.jpg',
      });

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data submitted successfully:', response.data);
      setSuccess(response.data.message)

      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => setUserDetails({ ...userDetails, first_name: text })}
          />
          <Text style={styles.errorText}>{validationErrors.first_name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setUserDetails({ ...userDetails, last_name: text })}
          />
          <Text style={styles.errorText}>{validationErrors.last_name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
          />
          <Text style={styles.errorText}>{validationErrors.email}</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(text) => setUserDetails({ ...userDetails, phone: text })}
          />
          <Text style={styles.errorText}>{validationErrors.phone}</Text>
          <Text style={styles.success}>{Success}</Text>
        </View>
        
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    height: undefined,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 12,
    margin: 20,
  },
  buttonText: {
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
});
