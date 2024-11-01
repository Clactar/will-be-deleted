import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const handleResetPassword = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail("clactar+1@gmail.com", {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/page1",
    });
  };

  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
  };
  const supabase = await createClient();
  let currentUser = null;
  try {
    const { data: user } = await supabase.auth.getUser();
    if (user) {
      currentUser = user.user;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <h1>Home</h1>
      {currentUser && <p>Current user: {currentUser.email}</p>}
      {!currentUser && <Link href='/login'>Login</Link>}

      <form action={handleResetPassword}>
        <Button type='submit'>Reset Password</Button>
      </form>
      <form action={handleLogout}>
        <Button type='submit'>Logout</Button>
      </form>
    </>
  );
}
