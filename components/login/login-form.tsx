"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";
import { login, signup } from "@/lib/auth-actions";
import {
  loginSchema,
  signupSchema,
  type LoginFormType,
  type SignupFormType,
} from "@/lib/schemas/auth";
import ResetForm from "./ResetForm";

export type LoginFormState = "login" | "reset" | "signup";

export function LoginForm() {
  const [loginFormState, setLoginFormState] = useState<LoginFormState>("login");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormType | SignupFormType>({
    resolver: zodResolver(
      loginFormState === "login" ? loginSchema : signupSchema
    ),
    defaultValues: {
      email: "",
      password: "",
      ...(loginFormState === "signup" ? { confirmPassword: "" } : {}),
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormType | SignupFormType) => {
    setError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result =
      loginFormState === "login"
        ? await login(formData)
        : await signup(formData);

    if (result?.error) {
      if (result.error.includes("User already registered")) {
        setError("Cette adresse email est déjà utilisée");
        return;
      }
      if (result.error.includes("Invalid login credentials")) {
        setError("Email ou mot de passe incorrect");
        return;
      }
      setError(result.error);
      return;
    }

    router.push("/");
  };

  const switchMode = (mode: LoginFormState) => {
    setLoginFormState(mode);
    setError(null);
    form.reset({
      email: "",
      password: "",
      ...(mode === "signup" ? { confirmPassword: "" } : {}),
    });
  };

  return (
    <>
      {loginFormState === "reset" && (
        <ResetForm onBackToLogin={() => switchMode("login")} />
      )}
      {loginFormState !== "reset" && (
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              {loginFormState === "login" ? "Connexion" : "Inscription"}
            </CardTitle>
            <CardDescription>
              Entrez votre email ci-dessous pour{" "}
              {loginFormState === "login" ? "vous connecter" : "vous inscrire"}à
              votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant='destructive' className='mb-4'>
                <ExclamationTriangleIcon className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid gap-4'
                noValidate
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          placeholder='m@exemple.com'
                          autoComplete='email'
                          aria-describedby='email-error'
                        />
                      </FormControl>
                      <FormMessage className='text-sm text-red-500' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Mot de passe</FormLabel>
                        {loginFormState === "login" && (
                          <Button
                            variant='link'
                            type='button'
                            className='text-sm text-muted-foreground hover:underline'
                            onClick={() => switchMode("reset")}
                          >
                            Mot de passe oublié ?
                          </Button>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          autoComplete={
                            loginFormState === "login"
                              ? "current-password"
                              : "new-password"
                          }
                          aria-describedby='password-error'
                        />
                      </FormControl>
                      <FormMessage className='text-sm text-red-500' />
                    </FormItem>
                  )}
                />

                {loginFormState === "signup" && (
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='password'
                            autoComplete='new-password'
                            aria-describedby='confirm-password-error'
                          />
                        </FormControl>
                        <FormMessage className='text-sm text-red-500' />
                      </FormItem>
                    )}
                  />
                )}

                <Button
                  type='submit'
                  className='w-full'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Chargement..."
                    : loginFormState === "login"
                    ? "Se connecter"
                    : "S'inscrire"}
                </Button>
                <SignInWithGoogleButton />
              </form>
            </Form>

            <div className='mt-4 text-center text-sm'>
              {loginFormState === "login" ? (
                <>
                  Vous n'avez pas de compte ?{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className='text-primary hover:underline'
                  >
                    S'inscrire
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{" "}
                  <button
                    onClick={() => switchMode("login")}
                    className='text-primary hover:underline'
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
