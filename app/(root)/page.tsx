import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function logOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/sign-in");
  }

  return (
    <>
      <form action={logOut} className="px-10 pt-[100px]">
        <Button type="submit">Log Out</Button>
      </form>
      <h1 className="h1-bold">Hello World</h1>
      {user ? (
        <>
          {console.log(user)}
          <p>
            Logged in as: {user.email} and {user.id}
          </p>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
};

export default Home;
