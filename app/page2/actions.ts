"use server";
import { createClient } from "@/utils/supabase/server";

export const updatePassword = async (
  email: string,
  password: string
): Promise<{ message: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return { message: "error updating password" };
    }
    return { message: "Password updated successfully" };
  } catch (error) {
    console.log(error);
    return { message: "error updating password" };
  }
};
