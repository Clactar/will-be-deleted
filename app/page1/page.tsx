import { createClient } from "@/utils/supabase/server";

export default async function Page1() {
  const supabase = await createClient();
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("event", event, "session", session);

    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      // handle sign in event
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
    } else if (event === "PASSWORD_RECOVERY") {
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  // call unsubscribe to remove the callback

  return <div>Page1</div>;
}
