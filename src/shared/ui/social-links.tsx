import Image from "next/image";

const links = [
  {
    name: "Instagram",
    image: "/icons/instagram.svg",
    href: "https://www.instagram.com",
  },
  {
    name: "Facebook",
    image: "/icons/facebook.svg",
    href: "https://www.facebook.com",
  },
  {
    name: "YouTube",
    image: "/icons/youtube.svg",
    href: "https://www.youtube.com",
  },
];
export const SocialLinks = () => {
  return (
    <ul className="flex gap-4">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href={link.href} target="_blank">
            <Image
              className="fill-current text-white stroke-white"
              src={link.image}
              alt={link.name}
              width={20}
              height={20}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
