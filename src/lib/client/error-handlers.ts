export const handleServerError = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    error.message === "NEXT_REDIRECT"
  ) {
    throw error; // Rethrow the redirect error to be handled by Next.js
  } else {
    console.error("A server error:", error);
    alert("An error occurred. Please try again.");
  }
};

export const handleActionErrors = (
  error: { formErrors: Record<string, string[]> } | { serverError: true },
) => {
  if ("serverError" in error) {
    alert("An error occurred while submitting the form. Please try again.");
  } else {
    const firstMessage = Object.values(error.formErrors)[0]?.[0];
    if (firstMessage) alert(firstMessage);
  }
};
