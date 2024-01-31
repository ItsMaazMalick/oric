import Image from "next/image";

export default function UserAuthTitle({ title }: { title: string }) {
  return (
    <div className="p-1 text-2xl font-bold md:p-5 ">
      {/* Image */}
      <div className="relative mx-auto w-[100px] h-[80px] md:w-[120px] md:h-[100px]">
        <Image
          src={"/images/site-logo.png"}
          alt="ORIC user login"
          fill={true}
        />
      </div>
      <h2 className="text-lg text-center md:text-2xl text-primary">{title}</h2>
    </div>
  );
}
