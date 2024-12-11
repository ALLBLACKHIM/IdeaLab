import { auth } from "@/auth"
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if(!session){
        redirect("/");
    }
  return (
    <>
    <section className="sky_container !min-h-[230px]">
        <h1 className="heading">Contribute Your Idea</h1>
    </section>
    </>
  )
}

export default page