import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const handleResetPassword = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail("clactar+1@gmail.com", {
      redirectTo: process.env.NEXT_PUBLIC_URL + "/page1",
    });
  };

  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
  };

  return (
    <>
      <h1>Home</h1>
      <Link href='/login'>Login</Link>

      <form action={handleResetPassword}>
        <Button type='submit'>Reset Password</Button>
      </form>
      <form action={handleLogout}>
        <Button type='submit'>Logout</Button>
      </form>
    </>
  );
}
