import { FiUser } from "react-icons/fi";
import { auth , signIn,signOut} from "../../auth";

export default async function Navbar() {
  const session  = await auth();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b overflow-hidden">
      <div className="flex items-center space-x-2">
        <img
          src="/printin-logo.png"
          alt="logo"
          className="h-12 w-auto object-contain"
          style={{ maxHeight: "48px" }}
        />
     
      </div>
      <nav className="hidden md:flex space-x-6 text-gray-700">
        <a href="#" className="hover:text-teal-600">Useful for you</a>
        <a href="#" className="hover:text-teal-600">Business</a>
        <a href="#" className="hover:text-teal-600">Ryman</a>
        <a href="#" className="hover:text-teal-600">Mail Boxes</a>
        <a href="#" className="hover:text-teal-600">Students</a>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-gray-700">
          <span>🇬🇧</span>
          <span>English</span>
        </div>
        {session && session.user ? (
            <>
             <FiUser/>
            <span> welcome {session?.user?.name}</span>
            <form action={async () => {
                'use server'

                await signOut({ redirectTo: "/" })
            }}>
                <button className="text-black" type="submit">
                    logout
                </button>
            </form>
            </>
           
        ):(
              <form action={async ()=>{
            "use server"
            await signIn('google')}}>
            <button type="submit" className="text-black">
                login
            </button>
         </form>
        )}
       
       
      </div>
    </header>
  );
}
