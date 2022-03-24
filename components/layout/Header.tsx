import Image from "next/image";

export default function Header() {
  return (
    <div className="text-slate-200 flex flex-row justify-between items-center pt-3 pb-3">
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
      </div>
    </div>
  );
}
