import { motion } from 'framer-motion';
import { MdSend } from 'react-icons/md';

interface SubmitButtonProps {
  /** Whether the form is currently submitting */
  isLoading?: boolean;
  /** Whether the form has been successfully submitted */
  isSuccess?: boolean;
  /** Whether the submit button should be disabled */
  disabled?: boolean;
  /** Custom text to show on the button */
  text?: string;
  /** Custom success message */
  successText?: string;
  /** Custom loading message */
  loadingText?: string;
  /** Custom disabled message */
  disabledText?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Reusable submit button component with loading and success states
 */
export const SubmitButton = ({
  isLoading = false,
  isSuccess = false,
  disabled = false,
  text = 'Send Message',
  successText = 'Message Sent',
  loadingText = 'Sending...',
  disabledText = 'Please fill in required fields',
  onClick,
  className = ''
}: SubmitButtonProps) => {
  if (disabled) {
    return (
      <button
        className="w-full py-4 px-6 rounded-xl font-medium bg-darker/60 text-white/40 border border-subtle/30 cursor-not-allowed"
      >
        {disabledText}
      </button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading || isSuccess}
      className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
        isSuccess
          ? 'bg-green/20 text-green cursor-not-allowed border border-green/30'
          : isLoading
          ? 'bg-blue/30 text-blue cursor-not-allowed border border-blue/30'
          : 'bg-gradient-to-r from-blue/20 to-accent3/20 hover:from-blue/30 hover:to-accent3/30 text-white border border-blue/30 hover:border-accent3/50 backdrop-blur-sm'
      } ${className}`}
      whileHover={{ scale: isLoading || isSuccess ? 1 : 1.02 }}
      whileTap={{ scale: isLoading || isSuccess ? 1 : 0.98 }}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue border-t-transparent"></div>
          <span>{loadingText}</span>
        </>
      ) : isSuccess ? (
        <>
          <span className="text-lg">✅</span>
          <span>{successText}</span>
        </>
      ) : (
        <>
          <MdSend className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          <span>{text}</span>
        </>
      )}
    </motion.button>
  );
}; 