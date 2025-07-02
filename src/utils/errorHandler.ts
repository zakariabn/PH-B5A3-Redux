import type {
  AxiosErrorShape,
  RTKQueryError,
  ZodErrorShape,
} from "@/types/error.types";

export function getErrorMessage(error: unknown): string {
  // Handle RTK Query error
  if (isRTKQueryError(error)) {
    return error.data?.message || error.data?.error || "Server error";
  }

  // Handle Axios-like error
  if (isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong (Axios)"
    );
  }

  // Handle Zod/validation error
  if (isZodError(error)) {
    return (
      error.data?.error ||
      Object.values(error.data?.errors || {})[0] ||
      "Validation failed"
    );
  }

  // Native JS Error
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === "string") return error;

  // Fallback
  return "Something went wrong. Please try again.";
}

// ✅ Type guards
function isRTKQueryError(error: unknown): error is RTKQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  );
}

function isAxiosError(error: unknown): error is AxiosErrorShape {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

function isZodError(error: unknown): error is ZodErrorShape {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    ("error" in (error as any).data || "errors" in (error as any).data)
  );
}
