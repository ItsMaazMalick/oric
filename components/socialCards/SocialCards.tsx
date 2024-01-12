import { socialLinks } from "@/constants/socialLinks";
import Image from "next/image";
import Link from "next/link";
import TooltipComponent from "../tooltip/TooltipComponent";

export default function SocialCards() {
  return (
    <>
      {socialLinks.map((social) => (
        <TooltipComponent key={social.id} title={`${social.title}`}>
          <Link
            key={social.id}
            className="w-full flex justify-center items-center hover:scale-125 transition-all duration-300"
            href={social.url}
            target="_blank"
          >
            <Image src={social.image} alt={social.alt} width={30} height={30} />
          </Link>
        </TooltipComponent>
      ))}
    </>
  );
}
