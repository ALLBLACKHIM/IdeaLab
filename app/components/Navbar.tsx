import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "../auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-black  shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={30}
            className="rounded"
          />
        </Link>

        <div className="flex item-center gap-5 text-white">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="text-2xl">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
                className="text-2xl"
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`} className="text-2xl">
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" className="text-2xl">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
