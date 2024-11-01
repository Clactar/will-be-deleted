"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/schemas/auth";
import { z } from "zod";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",

    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    console.error(error);
    redirect("/error");
  }

  redirect(data.url);
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  try {
    // Valider les données du formulaire
    const validatedFields = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { error } = await supabase.auth.signInWithPassword(validatedFields);

    if (error) {
      console.error("error login with supabase", error);
      return { error: error.message };
    }

    revalidatePath("/", "layout");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "error login with zod at step instanceof z.ZodError",
        error
      );
      return { error: error.errors[0].message };
    }
    console.error(
      "error login with zod at step return { error: 'Une erreur est survenue' }",
      error
    );
    return { error: "Une erreur est survenue" };
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  try {
    // Valider les données du formulaire
    const validatedFields = signupSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const { error } = await supabase.auth.signUp({
      email: validatedFields.email,
      password: validatedFields.password,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/", "layout");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Une erreur est survenue" };
  }
}

export async function resetPassword(formData: FormData): Promise<{
  message: string;
}> {
  const supabase = await createClient();

  try {
    // Validate form data with zod
    const validatedFields = resetPasswordSchema.parse({
      email: formData.get("email"),
    });

    // Call the RPC function to check if user exists
    const { data: user, error: rpcError } = await supabase.rpc(
      "get_user_by_email",
      { email_address: validatedFields.email }
    );

    if (rpcError) {
      console.error("Error checking user existence:", rpcError);
      return {
        message: "Une erreur est survenue lors de la vérification de l'email",
      };
    }

    if (!user) {
      return { message: "Cette adresse email n'est pas associée à un compte" };
    }

    // If we get here, the user exists, so we can send the reset password email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      validatedFields.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      }
    );

    if (resetError) {
      console.error("Error sending reset password email:", resetError);
      return { message: "Une erreur est survenue lors de l'envoi de l'email" };
    }

    return {
      message: `Un email de réinitialisation de mot de passe a été envoyé à ${validatedFields.email}. Si vous ne le recevez pas, vérifiez votre dossier spam ou contactez notre assistance.`,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof z.ZodError) {
      return { message: error.errors[0].message };
    }
    return { message: "Une erreur est survenue" };
  }
}
