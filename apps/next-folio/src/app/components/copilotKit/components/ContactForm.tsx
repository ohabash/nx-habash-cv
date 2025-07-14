'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdPhone, MdBusiness, MdMessage, MdClose, MdSend } from 'react-icons/md';
import { HiPaperAirplane } from 'react-icons/hi2';
import { useGlobalContext } from '@/global.context';
import { sendContactNotification } from '@/services/email.service';

const sig = `[ ContactForm ] ::: `;

interface ContactFormProps {
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialCompany?: string;
  initialMessage?: string;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmitProps {
  formData: FormData;
  onSuccess: () => void;
  onError: (error: string) => void;
  disabled: boolean;
}

// Submit component for handling form submission
const Submit = ({ formData, onSuccess, onError, disabled }: SubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatContactMessage = (): string => {
    const parts = [
      `Contact Form Submission`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
    ];

    if (formData.phone) parts.push(`Phone: ${formData.phone}`);
    if (formData.company) parts.push(`Company: ${formData.company}`);
    parts.push(`Message: ${formData.message}`);

    return parts.join('\n');
  };

  const handleSubmit = async () => {
    console.log(sig, '📧 Submit button clicked');
    console.log(sig, 'Form data:', formData);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendContactNotification(formatContactMessage());
      
      if (response.success) {
        console.log(sig, '✅ Message sent successfully');
        setMessageSent(true);
        onSuccess();
      } else {
        console.error(sig, '❌ Message sending failed:', response.error);
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
              ✅ Thank you! Your message has been sent successfully.
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!disabled ? (
        <motion.button
          onClick={handleSubmit}
          disabled={isLoading || messageSent}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
            messageSent
              ? 'bg-green/20 text-green cursor-not-allowed border border-green/30'
              : isLoading
              ? 'bg-blue/30 text-blue cursor-not-allowed border border-blue/30'
              : 'bg-gradient-to-r from-blue/20 to-accent3/20 hover:from-blue/30 hover:to-accent3/30 text-white border border-blue/30 hover:border-accent3/50 backdrop-blur-sm'
          }`}
          whileHover={{ scale: isLoading || messageSent ? 1 : 1.02 }}
          whileTap={{ scale: isLoading || messageSent ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue border-t-transparent"></div>
              <span>Sending...</span>
            </>
          ) : messageSent ? (
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
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue/40 transition-all duration-300 ${
                        errors.name ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red/90 text-sm mt-2 ml-2">{errors.name}</p>
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue/40 transition-all duration-300 ${
                        errors.email ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red/90 text-sm mt-2 ml-2">{errors.email}</p>
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
                      onChange={(e) => handleInputChange('phone', e.target.value)}
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
                      onChange={(e) => handleInputChange('company', e.target.value)}
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
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className={`w-full pl-12 pr-4 py-4 bg-darker/40 backdrop-blur-sm border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green/40 transition-all duration-300 resize-none ${
                        errors.message ? 'border-red/50' : 'border-subtle/50'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red/90 text-sm mt-2 ml-2">{errors.message}</p>
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
                  console.log(sig, '📝 Form fields will be hidden, but title and success message remain visible');
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
                <div className="text-4xl mb-3 text-accent3 flex justify-center">
                  <HiPaperAirplane />
                </div>
                <h3 className="text-green/90 text-lg font-medium mb-2">
                  Thank you!
                </h3>
                <p className="text-green/80 text-sm">
                 Ask for my contact info if you prefer not to wait.
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6">
            <p className="text-white/40 text-xs text-center leading-relaxed">
              {isSubmitted
                ? 'Feel free to ask me any other questions!'
                : 'All required fields (*) must be completed before sending.'
              }
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