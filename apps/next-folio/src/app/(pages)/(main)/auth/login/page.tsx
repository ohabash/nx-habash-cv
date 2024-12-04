import { Button } from "@/components/button/Button";
import { FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const page = () => {
  const headerCopy = 'Sign In';
  const subHeaderCopy = (
    <>
      Your data is safe with me. I will never share your email or information with anyone.
    </>
  );
  return (
    <>
      <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
      <p className="f text-left">{subHeaderCopy}</p>
      <div className="ops mt-[2vh] flex_">
        <Button className="w-full py-4 bg-google text-white hover:brightness-110">
          <FaGoogle className="mr-3 font-black" />
          Sign In with Google
        </Button>
        <Button href={'/auth/login-form'} className="w-full py-4 mt-5 hover:brightness-95 ">
          <MdEmail className="mr-3" />
          Sign In with Email
        </Button>
      </div>
    </>
  );
}

export default page
