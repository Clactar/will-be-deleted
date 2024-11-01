"use client";

import { useState } from "react";
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
import { resetPassword } from "@/lib/auth-actions";
import {
  resetPasswordSchema,
  type ResetPasswordFormType,
} from "@/lib/schemas/auth";

type ResetFormProps = {
  onBackToLogin: () => void;
};

export default function ResetForm({ onBackToLogin }: ResetFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ResetPasswordFormType) => {
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.append("email", data.email);

    const result = await resetPassword(formData);

    if (result.message.includes("n'est pas utilisé")) {
      setError(result.message);
    } else {
      setMessage(result.message);
      form.reset();
    }
  };

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>
          Réinitialisation du mot de passe
        </CardTitle>
        <CardDescription>
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert className='mb-4'>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
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
                    />
                  </FormControl>
                  <FormMessage className='text-sm text-red-500' />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Envoi en cours..."
                : "Envoyer le lien"}
            </Button>
          </form>
        </Form>
        <Button
          type='button'
          variant='outline'
          className='w-full mt-4'
          onClick={onBackToLogin}
        >
          Retour à la connexion
        </Button>
      </CardContent>
    </Card>
  );
}
