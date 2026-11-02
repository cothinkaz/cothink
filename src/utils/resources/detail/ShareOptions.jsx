import { LinkedInIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "../shared/ShareIcons";

export default function ShareOptions({ title, url }) {
  const shareText = encodeURIComponent(title || "");
  const shareUrlEncoded = encodeURIComponent(url);
  const socials = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`,
      bg: "#0A66C2",
      icon: <LinkedInIcon />,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`,
      bg: "#1877F2",
      icon: <FacebookIcon />,
    },
    {
      label: "Instagram",
      href: `https://www.instagram.com/`,
      bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      icon: <InstagramIcon />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrlEncoded}`,
      bg: "#25D366",
      icon: <WhatsAppIcon />,
    },
  ];

  return (
    <>
          {socials.map(({ label, href, bg, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full text-white transition-opacity hover:opacity-85"
              style={{ background: bg }}
              aria-label={label}
            >
              {icon}
            </a>
          ))}

    </>
  );
}
