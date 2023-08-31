import type { AuthorSocial } from "@/types/Authors";
import {
  Github,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
} from "@/resources/static/Icons";
import { useEffect, useRef } from "react";

const buttonType = {
  github: {
    bg: "#fff",
    icon: Github,
  },
  mail: {
    bg: "#E44A5B",
    icon: Mail,
  },
  instagram: {
    bg: "radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)",
    icon: Instagram,
  },
  linkedin: {
    bg: "#0e76a8",
    icon: Linkedin,
  },
  twitter: {
    bg: "#1DA1F2",
    icon: Twitter,
  },
};

export function SocialButton(social: AuthorSocial) {
  const button = buttonType[social.name];
  const anchorContainer = useRef<HTMLAnchorElement | null>(null);
  const notificationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (social.name !== "mail") {
      anchorContainer.current!.href = social.link;
    } else {
      anchorContainer.current!.href = "#0";
      anchorContainer.current!.addEventListener("click", () => {
        const notification = notificationContainer.current!;

        navigator.clipboard.writeText(social.link);
        notification.classList.remove("hidden");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 3000);
      });
    }
  }, []);

  return (
    <>
      <a
        className="hover:scale-110 transition-transform cursor-pointer flex gap-1 capitalize font-semibold p-1.5 rounded-xl border-4 border-crust"
        style={{ background: button.bg, color: "black" }}
        ref={anchorContainer}
      >
        <span>{button.icon()}</span>
        <span>{social.name}</span>
      </a>
      {social.name === "mail" && (
        <div
          ref={notificationContainer}
          className="fixed top-24 right-0 w-full hidden z-50"
        >
          <CopiedNotification />
        </div>
      )}
    </>
  );
}

function CopiedNotification() {
  return (
    <aside className="flex justify-center">
      <p className="bg-fg-third font-bold w-fit px-3 py-1.5 rounded-xl">
        Copiado para seu clipboard
      </p>
    </aside>
  );
}
