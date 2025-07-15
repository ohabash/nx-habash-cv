'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdPhone, MdBusiness, MdMessage, MdClose, MdSend } from 'react-icons/md';
import { HiPaperAirplane } from 'react-icons/hi2';
import { useGlobalContext } from '@/global.context';
import { sendContactNotification } from '@/services/email.service';

const sig = `[ ContactForm ] ::: `;

/**
 * Props interface for ContactForm component
 * 
 * @interface ContactFormProps
 * @description Defines optional props for pre-populating form fields
 * 
 * @see {@link ContactForm} - Component that uses these props
 */
interface ContactFormProps {
  /** Pre-populate name field */
  initialName?: string;
  /** Pre-populate email field */
  initialEmail?: string;
  /** Pre-populate phone field */
  initialPhone?: string;
  /** Pre-populate company field */
  initialCompany?: string;
  /** Pre-populate message field */
  initialMessage?: string;
  /** Callback function to close the form */
  onClose?: () => void;
}

/**
 * Form data structure for contact form
 * 
 * @interface FormData
 * @description Contains all form field values
 * 
 * @see {@link ContactForm} - Component managing this form data
 * @see {@link formatContactMessage} - Function that uses this data
 */
interface FormData {
  /** User's full name (required) */
  name: string;
  /** User's email address (required) */
  email: string;
  /** User's phone number (optional) */
  phone: string;
  /** User's company/organization (optional) */
  company: string;
  /** User's message content (required) */
  message: string;
}

/**
 * Form validation error messages
 * 
 * @interface FormErrors
 * @description Contains validation error messages for form fields
 * 
 * @see {@link ContactForm} - Component that manages these errors
 */
interface FormErrors {
  /** Name field validation error */
  name?: string;
  /** Email field validation error */
  email?: string;
  /** Message field validation error */
  message?: string;
}

/**
 * Props interface for Submit component
 * 
 * @interface SubmitProps
 * @description Defines props for the submit button component
 * 
 * @see {@link Submit} - Component that uses these props
 * @see {@link handleSubmit} - Function that handles the submission logic
 */
interface SubmitProps {
  /** Form data to submit */
  formData: FormData;
  /** Callback called on successful submission */
  onSuccess: () => void;
  /** Callback called on submission error */
  onError: (error: string) => void;
  /** Whether submit button should be disabled */
  disabled: boolean;
}

/**
 * Submit component for handling form submission with loading and error states
 * 
 * @component Submit
 * @description Renders submit button with loading spinner, success state, and error handling
 * 
 * @param {SubmitProps} props - Component props
 * @param {FormData} props.formData - Form data to submit
 * @param {Function} props.onSuccess - Callback called on successful submission
 * @param {Function} props.onError - Callback called on submission error
 * @param {boolean} props.disabled - Whether submit button should be disabled
 * 
 * @see {@link SubmitProps} - Interface defining component props
 * @see {@link ContactForm} - Parent component that uses this Submit component
 * @see {@link handleSubmit} - Function that calls this component's submit handler
 * @see {@link sendContactNotification} - Email service function called during submission
 * 
 * @example
 * <Submit
 *   formData={formData}
 *   onSuccess={() => setSuccess(true)}
 *   onError={(error) => setError(error)}
 *   disabled={!isFormValid}
 * />
 * 
 * @returns {JSX.Element} Submit button with loading and success states
 */
const Submit = ({ formData, onSuccess, onError, disabled }: SubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDev = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

  /**
   * Formats form data into structured email content
   * 
   * @function formatContactMessage
   * @description Converts form fields into formatted string for email body
   * 
   * @see {@link handleSubmit} - Uses this function to prepare email content
   * @see {@link FormData} - Interface defining form data structure
   * 
   * @returns {string} Formatted email content with contact information
   * 
   * @example
   * // Returns formatted string like:
   * // "Contact Form Submission\nName: John Doe\nEmail: john@example.com..."
   * const emailContent = formatContactMessage();
   */
  const formatContactMessage = (): string => {
    const parts = [
      `Contact Form Submission`,
      `<strong>Name: </strong> ${formData.name}`,
      `<strong>Email: </strong> ${formData.email}`,
    ];

    if (formData.phone) parts.push(`<strong>Phone: </strong> ${formData.phone}`);
    if (formData.company) parts.push(`<strong>Company: </strong> ${formData.company}`);
    parts.push(`<strong>Message: </strong> \n \n ${formData.message}`);

    return parts.join('\n');
  };

  /**
   * Handles contact form submission with complete email delivery flow
   * 
   * @async
   * @function handleSubmit
   * @description Processes form data, sends email notification, and updates UI state
   * 
   * @see {@link formatContactMessage} - Formats form data into email content
   * @see {@link sendContactNotification} - Located in @/services/email.service.ts
   * @see {@link ../../../api/email/send/route.ts} - Server-side API endpoint
   * @see {@link https://postmarkapp.com/developer/api/email} - Postmark Email API
   * 
   * @example
   * // Called when user clicks submit button
   * handleSubmit();
   * 
   * @returns {Promise<void>} Updates component state based on email send results
   * 
   * @throws {Error} Network errors, API failures, or Postmark service errors
   * 
   * CHRONOLOGICAL FLOW:
   * ====================
   * 
   * CLIENT: User clicks submit, logging starts, UI shows loading
   * CLIENT: Format message, prepare email service call
   * CLIENT: Make HTTP POST to /api/email/send
   * SERVER: Receive request, validate fields, add admin email
   * SERVER: Build Postmark payload, send to email service
   * POSTMARK: Validate domain, process delivery, return status
   * SERVER: Process response, return success/failure to client
   * CLIENT: Handle response, update UI, clean up loading state
   */
  const handleSubmit = async () => {
    console.log(sig, 'Submit button clicked');
    console.log(sig, 'Form data:', formData);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendContactNotification(formatContactMessage());
      console.log(sig, '📨 Email service response:', response);
      
      if (response.success) {
        console.log(sig, '✅ Message sent successfully');
        if (!isDev) {
          setMessageSent(true);
          onSuccess();
        } else {
          // In dev mode, just show success message but don't hide form
          setMessageSent(true);
          setTimeout(() => setMessageSent(false), 3000); // Clear success after 3s in dev mode
        }
      } else {
        console.error(sig, '❌ Message sending failed:', response.error);
        console.error(sig, '❌ Error details:', response.details);
        
        const errorMsg = response.error || 'Failed to send message';
        setError(errorMsg);
        onError(errorMsg);
      }
    } catch (err) {
      console.error(sig, '❌ Error sending message:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      onError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Status Messages */}
      {error && (
        <div className="mb-4">
          <div className="p-4 bg-red/10 border border-red/20 rounded-xl backdrop-blur-sm">
            <p className="text-red/90 text-sm text-center">
              <span className="font-medium">Error:</span> {error}
            </p>
          </div>
        </div>
      )}

      {messageSent && (
        <div className="mb-4">
          <div className="p-4 bg-green/10 border border-green/20 rounded-xl backdrop-blur-sm">
            <p className="text-green/90 text-sm text-center font-medium">
              ✅ Message sent successfully! {isDev && '(Dev mode: form remains visible)'}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!disabled ? (
        <motion.button
          onClick={handleSubmit}
          disabled={isLoading || (messageSent && !isDev)}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
            messageSent && !isDev
              ? 'bg-green/20 text-green cursor-not-allowed border border-green/30'
              : isLoading
              ? 'bg-blue/30 text-blue cursor-not-allowed border border-blue/30'
              : 'bg-gradient-to-r from-blue/20 to-accent3/20 hover:from-blue/30 hover:to-accent3/30 text-white border border-blue/30 hover:border-accent3/50 backdrop-blur-sm'
          }`}
          whileHover={{ scale: isLoading || (messageSent && !isDev) ? 1 : 1.02 }}
          whileTap={{ scale: isLoading || (messageSent && !isDev) ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue border-t-transparent"></div>
              <span>Sending...</span>
            </>
          ) : messageSent && !isDev ? (
            <>
              <span className="text-lg">✅</span>
              <span>Message Sent</span>
            </>
          ) : (
            <>
              <MdSend className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      ) : (
        <button
          className="w-full py-4 px-6 rounded-xl font-medium bg-darker/60 text-white/40 border border-subtle/30 cursor-not-allowed"
        >
          Please fill in required fields
        </button>
      )}
    </div>
  );
};

/**
 * ContactForm component for collecting and submitting user contact information
 * 
 * @component ContactForm
 * @description Main contact form with validation, auto-population, and email submission
 * 
 * @param {ContactFormProps} props - Component props
 * @param {string} [props.initialName=''] - Pre-populate name field
 * @param {string} [props.initialEmail=''] - Pre-populate email field  
 * @param {string} [props.initialPhone=''] - Pre-populate phone field
 * @param {string} [props.initialCompany=''] - Pre-populate company field
 * @param {string} [props.initialMessage=''] - Pre-populate message field
 * @param {Function} [props.onClose] - Callback for closing the form
 * 
 * @see {@link ContactFormProps} - Interface defining component props
 * @see {@link Submit} - Child component handling form submission
 * @see {@link useGlobalContext} - Hook for accessing global profile data
 * @see {@link @/services/email.service.ts} - Email service used for sending messages
 * 
 * @example
 * <ContactForm
 *   initialName="John Doe"
 *   initialEmail="john@example.com"
 *   onClose={() => setShowForm(false)}
 * />
 * 
 * @returns {JSX.Element} Complete contact form with validation and submission
 */
export const ContactForm = ({
  initialName = '',
  initialEmail = '',
  initialPhone = '',
  initialCompany = '',
  initialMessage = '',
  onClose
}: ContactFormProps) => {
  const { profile } = useGlobalContext();
  
  // Debug logging for initial props
  useEffect(() => {
    console.log(sig, '🎯 ContactForm mounted with initial props:', {
      initialName,
      initialEmail,
      initialPhone,
      initialCompany,
      initialMessage
    });
  }, []);
  
  const [formData, setFormData] = useState<FormData>({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
    company: initialCompany,
    message: initialMessage
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update form data when initial props change (this handles cases where props come in after initial render)
  useEffect(() => {
    console.log(sig, '🔄 Props changed, updating form data:', {
      initialName,
      initialEmail,
      initialPhone,
      initialCompany,
      initialMessage
    });
    
    setFormData(prev => ({
      name: initialName || prev.name,
      email: initialEmail || prev.email,
      phone: initialPhone || prev.phone,
      company: initialCompany || prev.company,
      message: initialMessage || prev.message
    }));
  }, [initialName, initialEmail, initialPhone, initialCompany, initialMessage]);

  // Auto-populate from global context if available and no initial values provided
  useEffect(() => {
    console.log(sig, '🔄 Checking profile data for auto-population:', profile);
    console.log(sig, '🔄 Current form data:', formData);
    
    if (profile?.name && !initialName && !formData.name) {
      console.log(sig, '📝 Auto-filling name from profile:', profile.name);
      setFormData(prev => ({ ...prev, name: profile.name || '' }));
    }
    if (profile?.email && !initialEmail && !formData.email) {
      console.log(sig, '📝 Auto-filling email from profile:', profile.email);
      setFormData(prev => ({ ...prev, email: profile.email || '' }));
    }
  }, [profile, initialName, initialEmail]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitValidation = () => {
    console.log(sig, '📝 Form submission attempted', formData);
    if (validateForm()) {
      console.log(sig, '✅ Form validation passed');
      return true;
    } else {
      console.log(sig, '❌ Form validation failed', errors);
      return false;
    }
  };

  // Check if all required fields are filled (name, email, message)
  const canSubmit = formData.name.trim().length > 0 && 
                    formData.email.trim().length > 0 && 
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                    formData.message.trim().length > 0;



  return (
    <div className="flex justify-center items-center py-6">
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden">
        {/* Main Form Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkest via-darker to-dark rounded-2xl border border-darkBlue/30" />

        {/* Ambient lighting effects */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent3/5 rounded-full blur-2xl" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue/20 to-accent3/20 rounded-full border border-blue/30 flex items-center justify-center">
                  <MdMessage className="text-blue text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Contact Form</h1>
                  <p className="text-blue/90 text-sm">Let's get in touch!</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-darker/40 hover:bg-darker/60 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <MdClose className="text-white/60 hover:text-white text-lg" />
                </button>
              )}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue/30 to-transparent mt-4" />
          </div>

          {/* Form Fields - Only show if not submitted */}
          {!isSubmitted && (
            <>
              <div className="space-y-4 mb-8">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <MdPerson className="text-blue/60 text-lg" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue/40 transition-all duration-300 ${
                        errors.name ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red/90 text-sm mt-2 ml-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <MdEmail className="text-blue/60 text-lg" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your email address *"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue/40 transition-all duration-300 ${
                        errors.email ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red/90 text-sm mt-2 ml-2">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <MdPhone className="text-accent2/60 text-lg" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border border-subtle/50 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent2/40 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <MdBusiness className="text-accent3/60 text-lg" />
                    </div>
                    <input
                      type="text"
                      placeholder="Company/Organization (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange('company', e.target.value)
                      }
                      className="w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border border-subtle/50 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent3/40 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 z-10">
                      <MdMessage className="text-green/60 text-lg" />
                    </div>
                    <textarea
                      placeholder="Your message *"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      rows={4}
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green/40 transition-all duration-300 resize-none ${
                        errors.message ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red/90 text-sm mt-2 ml-2">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Component */}
              <Submit
                formData={formData}
                disabled={!canSubmit}
                onSuccess={() => {
                  console.log(sig, '✅ Message sent successfully');
                  setIsSubmitted(true);
                  console.log(
                    sig,
                    '📝 Form fields will be hidden, but title and success message remain visible'
                  );
                }}
                onError={(error) => {
                  console.error(sig, '❌ Message sending failed:', error);
                }}
              />
            </>
          )}

          {/* Success Message - Only show if submitted */}
          {isSubmitted && (
            <div className="mb-4">
              <div className="p-6 bg-green/10 border border-green/20 rounded-xl backdrop-blur-sm text-center">
                <h3 className="text-white font-bold mt-2 text-lg mb-2">
                   Thank you!
                </h3>
                <p className="text-green font-medium text-sm text-center leading-relaxed">
                  Message sent successfully. I'll get back to you soon!
                </p>
                
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6">
            <p className="text-white/50 text-xs text-center leading-relaxed">
              {isSubmitted
                ? 'Ask for my contact info if you prefer not to wait.'
                : 'All required fields (*) must be completed before sending.'}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 pointer-events-none">
          <div className="w-12 h-12 bg-gradient-to-br from-green/10 to-blue/10 rounded-full backdrop-blur-sm border border-green/20" />
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-br from-blue/10 to-accent2/10 rounded-full backdrop-blur-sm border border-blue/20" />
        </div>
      </div>
    </div>
  );
}; 