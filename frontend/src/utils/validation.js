import Swal from "sweetalert2";

// Common validation patterns
export const validationRules = {
  password: {
    minLength: 6,
    message: "Password must be at least 6 characters long."
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address."
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "Username must be 3-30 characters and contain only letters, numbers, and underscores."
  }
};

// Show validation error with SweetAlert
export const showValidationError = (title, message) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    confirmButtonText: 'Try Again',
    confirmButtonColor: '#008080'
  });
};

// Show success message with SweetAlert
export const showSuccessMessage = (title, message, callback = null) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    confirmButtonText: 'Continue',
    confirmButtonColor: '#008080'
  }).then((result) => {
    if (result.isConfirmed && callback) {
      callback();
    }
  });
};

// Validate password
export const validatePassword = (password) => {
  if (password.length < validationRules.password.minLength) {
    showValidationError(
      'Password Too Short',
      validationRules.password.message
    );
    return false;
  }
  return true;
};

// Validate email
export const validateEmail = (email) => {
  if (!validationRules.email.pattern.test(email)) {
    showValidationError(
      'Invalid Email',
      validationRules.email.message
    );
    return false;
  }
  return true;
};

// Validate username
export const validateUsername = (username) => {
  if (username.length < validationRules.username.minLength || 
      username.length > validationRules.username.maxLength) {
    showValidationError(
      'Invalid Username Length',
      'Username must be between 3 and 30 characters.'
    );
    return false;
  }
  
  if (!validationRules.username.pattern.test(username)) {
    showValidationError(
      'Invalid Username Format',
      'Username can only contain letters, numbers, and underscores.'
    );
    return false;
  }
  return true;
};

// Validate password confirmation
export const validatePasswordConfirmation = (password, password2) => {
  if (password !== password2) {
    showValidationError(
      'Passwords Do Not Match',
      'Please make sure both passwords are the same.'
    );
    return false;
  }
  return true;
};

// Comprehensive form validation
export const validateSignupForm = (data) => {
  return (
    validateEmail(data.email) &&
    validateUsername(data.username) &&
    validatePassword(data.password) &&
    validatePasswordConfirmation(data.password, data.password2)
  );
};
