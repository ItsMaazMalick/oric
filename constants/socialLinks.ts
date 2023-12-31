const facebookUserName = "itsmaazmalick";
const instagramUserName = "itsmaazmalick";
const twitterUserName = "itsmaazmalick";
const phoneNumber = "+923125770904";
const whatsAppChatMessage =
  "Hi 👋! Thanks for your message. I'll get back to you within 24 hours.";
export const portfolioLink: string = "https://itsmaazmalick.vercel.app";

export const socialLinks = [
  {
    id: 1,
    title: "WhatsApp",
    image: "/images/whatsapp-icon.png",
    alt: "Maaz Malick on WhatsApp",
    url: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsAppChatMessage
    )}`,
  },
  {
    id: 2,
    title: "Facebook",
    image: "/images/facebook-icon.png",
    alt: "Maaz Malick on Facebook",
    url: `https://www.facebook.com/${facebookUserName}`,
  },
  {
    id: 3,
    title: "Instagram",
    image: "/images/instagram-icon.png",
    alt: "Maaz Malick on Instagram",
    url: `https://www.instagram.com/${instagramUserName}`,
  },
  {
    id: 4,
    title: "Twitter",
    image: "/images/twitter-icon.png",
    alt: "Maaz Malick on Twitter",
    url: `https://www.twitter.com/${twitterUserName}`,
  },
];
