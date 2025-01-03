export function errMsg(code: string) {
  console.log(`🚀 => errMsg => code:`, code);
  return authErrors[code.replace('auth/', '')] || code;
}

export const authErrors: Record<string, string> = {
  'admin-restricted-operation':
    'This operation is restricted to administrators. Contact the admin for access.',
  'argument-error':
    'An invalid argument was provided. Ensure all inputs meet the expected format.',
  'app-not-authorized':
    "This app's domain is not authorized to use Firebase Authentication. Verify your API key in the Google API console.",
  'app-not-installed':
    'The app associated with this request is not installed on your device. Install it and try again.',
  'captcha-check-failed':
    'The reCAPTCHA response is invalid, expired, or used. Verify your domain and retry the operation.',
  'code-expired':
    'The SMS verification code has expired. Please request a new code.',
  'cordova-not-ready':
    "Cordova framework isn't initialized. Ensure your environment is configured correctly.",
  'cors-unsupported':
    "This browser doesn't support Cross-Origin Resource Sharing. Try using a different browser.",
  'credential-already-in-use':
    'This credential is linked to another user. Try signing in with a different method.',
  'custom-token-mismatch':
    'The custom token is for a different project. Ensure the correct token is being used.',
  'requires-recent-login':
    'This action requires recent authentication. Please log in again to proceed.',
  'dynamic-link-not-activated':
    'Enable Dynamic Links in the Firebase Console to use this feature.',
  'email-change-needs-verification':
    'This operation requires a verified email. Please verify your email first.',
  'email-already-in-use':
    'An account already exists with this email. Try logging in or using a different email.',
  'expired-action-code':
    'The action code has expired. Request a new code to continue.',
  'cancelled-popup-request':
    'Another popup is open. Close it and retry the action.',
  'internal-error': 'An unexpected error occurred. Please try again later.',
  'invalid-app-credential':
    'The app verification token is invalid or expired. Verify your reCAPTCHA configuration.',
  'invalid-app-id':
    'The provided app ID is not registered. Check your project configuration.',
  'invalid-user-token':
    "The user's token is invalid. Log out and log in again.",
  'invalid-auth-event':
    'An error occurred with the authentication process. Retry or contact support.',
  'invalid-verification-code':
    'The SMS code entered is invalid. Request a new code and try again.',
  'invalid-continue-uri':
    "The continue URL provided is invalid. Ensure it's correct.",
  'invalid-cordova-configuration':
    'Ensure the required Cordova plugins are installed for OAuth sign-in.',
  'invalid-custom-token':
    'The custom token format is incorrect. Verify the token.',
  'invalid-dynamic-link-domain':
    'The dynamic link domain is not authorized for this project.',
  'invalid-email':
    'The email address format is incorrect. Please check and re-enter it.',
  'invalid-api-key':
    'The API key provided is invalid. Verify it in your Firebase configuration.',
  'invalid-cert-hash':
    'The provided SHA-1 certificate hash is incorrect. Update it in your project settings.',
  'invalid-credential':
    'The credential is malformed or expired. Reauthenticate and try again.',
  'invalid-message-payload':
    'The email template contains invalid characters. Update it in the Firebase Console.',
  'invalid-multi-factor-session':
    'The multi-factor session is invalid or missing.',
  'invalid-oauth-provider':
    'This operation only supports OAuth providers. Update the provider configuration.',
  'invalid-oauth-client-id':
    'The OAuth client ID is invalid. Check your Google Cloud configuration.',
  'unauthorized-domain':
    'The domain is not authorized for this operation. Update the domain list in Firebase Console.',
  'invalid-action-code':
    'The action code is invalid or expired. Request a new one.',
  'wrong-password': 'The password is incorrect. Double-check and try again.',
  'invalid-persistence-type':
    "The persistence type must be 'local', 'session', or 'none'.",
  'invalid-phone-number':
    'Enter the phone number in E.164 format (e.g., +1234567890).',
  'invalid-provider-id':
    'The provider ID is invalid. Check your configuration.',
  'invalid-recipient-email':
    'The recipient email address is invalid. Update and resend the request.',
  'invalid-sender':
    "The sender's email or name is invalid. Update it in the Firebase Console.",
  'invalid-verification-id':
    'The verification ID is invalid. Retry the verification process.',
  'invalid-tenant-id':
    'The tenant ID provided is incorrect. Update your Auth instance configuration.',
  'multi-factor-info-not-found':
    'No matching second factor found. Verify the identifier.',
  'multi-factor-auth-required':
    'Additional authentication is required. Complete the multi-factor authentication process.',
  'missing-android-pkg-name': 'Provide an Android package name to proceed.',
  'auth-domain-config-required':
    "Include 'authDomain' in your Firebase app configuration.",
  'missing-app-credential':
    'Provide a reCAPTCHA response token for verification.',
  'missing-verification-code': 'Provide an SMS verification code.',
  'missing-continue-uri': 'Specify a valid continue URL to proceed.',
  'missing-ios-bundle-id': 'Provide an iOS bundle ID for the app.',
  'missing-multi-factor-info':
    'Specify a second factor identifier to continue.',
  'missing-phone-number':
    'Provide a phone number to send the verification code.',
  'app-deleted':
    'The Firebase app has been deleted. Reinitialize it to continue.',
  'account-exists-with-different-credential':
    'Sign in using a provider linked to this email.',
  'network-request-failed':
    'A network error occurred. Check your connection and retry.',
  'null-user': 'The user object is null. Ensure a valid user is passed.',
  'operation-not-allowed':
    'This sign-in method is disabled. Enable it in the Firebase Console.',
  'popup-blocked':
    'The popup was blocked by the browser. Allow popups and retry.',
  'popup-closed-by-user': 'You closed the popup. Retry the action.',
  'provider-already-linked':
    'This user is already linked to the given provider.',
  'quota-exceeded': 'You have exceeded your quota. Try again later.',
  'redirect-operation-pending':
    'A redirect operation is already in progress. Wait for it to complete.',
  'too-many-requests':
    'Your device is temporarily blocked due to unusual activity. Try again later.',
  'unauthorized-continue-uri':
    'Whitelist the domain of the continue URL in the Firebase Console.',
  'unsupported-first-factor': 'Use a supported first factor to proceed.',
  'unsupported-tenant-operation':
    "This operation isn't supported in a multi-tenant setup.",
  'unverified-email': 'Verify your email to proceed.',
  'user-cancelled':
    "Permissions weren't granted. Retry and grant the necessary permissions.",
  'user-not-found': 'No user found for the provided identifier.',
  'user-disabled': 'This account has been disabled. Contact support.',
  'user-mismatch':
    "The credentials don't match the signed-in user. Retry with the correct user.",
  'user-signed-out': 'The user has signed out. Sign in again to continue.',
  'weak-password': 'Choose a password with at least 6 characters.',
  'web-storage-unsupported':
    "This browser doesn't support web storage. Enable cookies or switch browsers.",
};
