import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management and validation
 * @param {Object} initialValues - Initial form field values
 * @param {Object} validationSchema - Validation rules for form fields
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  }, [validationErrors]);

  // Validate a single field
  const validateField = useCallback((field, value) => {
    const fieldSchema = validationSchema[field];
    if (!fieldSchema) return null;

    // Check required validation
    if (fieldSchema.required && (!value || value.trim() === '')) {
      return fieldSchema.requiredMessage || `${field} is required`;
    }

    // Check custom validation function
    if (fieldSchema.validate && typeof fieldSchema.validate === 'function') {
      const customError = fieldSchema.validate(value);
      if (customError) return customError;
    }

    // Check pattern validation
    if (fieldSchema.pattern && value && !fieldSchema.pattern.test(value)) {
      return fieldSchema.patternMessage || `${field} format is invalid`;
    }

    return null;
  }, [validationSchema]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const errors = {};
    
    Object.keys(validationSchema).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validationSchema, validateField]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setValidationErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set field value programmatically
  const setFieldValue = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Set field error programmatically
  const setFieldError = useCallback((field, error) => {
    setValidationErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  return {
    formData,
    validationErrors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    validateField,
    resetForm,
    setFieldValue,
    setFieldError,
  };
}; 