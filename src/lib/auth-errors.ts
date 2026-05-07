export function firebaseErrorMessage(code?: string): string {
  switch (code) {
    case "auth/invalid-email": return "Please enter a valid email address.";
    case "auth/user-not-found": return "No account found with this email.";
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Incorrect email or password.";
    case "auth/email-already-in-use": return "An account already exists with this email.";
    case "auth/weak-password": return "Password should be at least 6 characters.";
    case "auth/too-many-requests": return "Too many attempts. Please try again later.";
    case "auth/network-request-failed": return "Network error. Check your connection.";
    default: return "Something went wrong. Please try again.";
  }
}
