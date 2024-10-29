import { updatePassword } from "./actions";
import { createClient } from "@/utils/supabase/server";
export default async function Page2() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const password = formData.get("password");
    const { message } = await updatePassword(
      data?.user?.email as string,
      password as string
    );
    console.log(message);
  };

  return (
    <form action={handleSubmit}>
      <input type='password' name='password' />
      <button type='submit'>Update Password</button>
    </form>
  );
}
