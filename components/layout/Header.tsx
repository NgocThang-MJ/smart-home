import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineLogout } from "react-icons/hi";

export default function Header() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("isAuth");
    router.push("/login");
  };
  return (
    <div className="text-slate-200 flex flex-row justify-between items-center pt-6 pb-5">
      <p style={{ fontFamily: "Dancing Script" }} className="text-4xl">
        Smart Homee
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center mr-3">
          <Image
            src="/bear.jpg"
            width="40"
            height="40"
            className="rounded-full"
          />
        </div>
        <p>Trần Ngọc Thắng</p>

        <HiOutlineLogout
          className="ml-3 text-2xl cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
}
