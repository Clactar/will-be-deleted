"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";

export function SignInWithGoogleButton() {
  const { pending } = useFormStatus();
  const handleClick = () => {
    signInWithGoogle();
  };
  return (
    <Button
      type='button'
      variant='secondary'
      className='w-full'
      onClick={handleClick}
      disabled={pending}
    >
      Sign in with Google
    </Button>
  );
}
