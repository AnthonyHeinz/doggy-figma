import React from 'react';
import { useForm } from '../../util/useForm';
import './styles.css';

/**
 * Reusable Form Component
 * @param {Object} props - Component props
 * @param {Object} props.initialValues - Initial form field values
 * @param {Object} props.validationSchema - Validation rules for form fields
 * @param {Array} props.fields - Array of field configurations
 * @param {Function} props.onSubmit - Submit handler function
 * @param {string} props.submitButtonText - Text for submit button
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.disabled - Whether form is disabled
 * @param {Object} props.customComponents - Custom input components
 */
const ReusableForm = ({
  initialValues = {},
  validationSchema = {},
  fields = [],
  onSubmit,
  submitButtonText = 'Submit',
  className = '',
  disabled = false,
  customComponents = {},
  children,
}) => {
  const {
    formData,
    validationErrors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    setFieldError,
  } = useForm(initialValues, validationSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting || disabled) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData, { setFieldError });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const {
      name,
      type = 'text',
      placeholder,
      label,
      component: CustomComponent,
      containerClassName = '',
      inputClassName = '',
      ...fieldProps
    } = field;

    // Use custom component if provided
    if (CustomComponent) {
      return (
        <CustomComponent
          key={name}
          name={name}
          value={formData[name] || ''}
          onChange={(value) => handleInputChange(name, value)}
          error={validationErrors[name]}
          disabled={disabled || isSubmitting}
          {...fieldProps}
        />
      );
    }

    // Use global custom component if available
    if (customComponents[type]) {
      const GlobalCustomComponent = customComponents[type];
      return (
        <GlobalCustomComponent
          key={name}
          name={name}
          value={formData[name] || ''}
          onChange={(value) => handleInputChange(name, value)}
          error={validationErrors[name]}
          disabled={disabled || isSubmitting}
          placeholder={placeholder}
          label={label}
          {...fieldProps}
        />
      );
    }

    // Default input rendering
    return (
      <div key={name} className={`form-field-container ${containerClassName}`}>
        {label && (
          <label htmlFor={name} className="form-field-label">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`form-field-input ${inputClassName} ${
            validationErrors[name] ? 'error' : ''
          }`}
          value={formData[name] || ''}
          onChange={(e) => handleInputChange(name, e.target.value)}
          disabled={disabled || isSubmitting}
          {...fieldProps}
        />
        {validationErrors[name] && (
          <span className="form-field-error">{validationErrors[name]}</span>
        )}
      </div>
    );
  };

  // Clone children and pass form state to any custom components
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        formData,
        handleInputChange,
        validationErrors,
        disabled: disabled || isSubmitting,
        ...child.props,
      });
    }
    return child;
  });

  return (
    <form className={`reusable-form ${className}`} onSubmit={handleSubmit}>
      {fields.map(renderField)}
      {enhancedChildren}
      {onSubmit && (
        <button
          type="submit"
          className="form-submit-button"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting ? 'Processing...' : submitButtonText}
        </button>
      )}
    </form>
  );
};

export default ReusableForm; 