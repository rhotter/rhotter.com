"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronCircleUp,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-gray-500" : "text-gray-900 underline"}`}
    >
      {children}
    </Link>
  );
};

const SocialIcon = ({
  icon,
  href,
}: {
  icon: FontAwesomeIconProps["icon"];
  href: string;
}) => (
  <Link href={href}>
    <FontAwesomeIcon
      icon={icon}
      className="w-4 h-4 text-gray-300 hover:text-gray-400"
    />
  </Link>
);

export const NavBar = () => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">Raffi Hotter</Link>
        <div className="flex gap-2">
          <SocialIcon
            href="https://twitter.com/yourTwitterHandle"
            icon={faTwitter}
          />
          <SocialIcon href="mailto:yourEmail@example.com" icon={faEnvelope} />
          <SocialIcon href="mailto:yourEmail@example.com" icon={faGithub} />
          <SocialIcon
            href="mailto:yourEmail@example.com"
            icon={faChevronCircleUp}
          />
        </div>
      </div>
      <nav>
        <div className="flex gap-4">
          <NavLink href="/">About</NavLink>
          <NavLink href="/posts">Posts</NavLink>
        </div>
      </nav>
    </div>
  );
};
