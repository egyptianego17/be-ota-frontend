// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image"; 
import Logo from "../../public/icon-512x512.png";

const Navbar = () => {
    return (
      <nav className="flex items-center justify-center bg-yellow-400 p-4 text-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <Image src={Logo} alt="Lotus Power Logo" width={100} height={50} />
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  