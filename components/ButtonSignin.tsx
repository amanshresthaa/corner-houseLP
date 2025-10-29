"use client";

import Link from '@/lib/debugLink';
import { useContent } from "@/hooks/useContent";
import config from "@/config";

const ButtonSignin = ({
  text,
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const { data: content } = useContent();
  const defaultText = content?.global?.ui?.buttons?.bookOnline || content?.global?.ui?.buttons?.getStarted || "Book Online";
  const href = config.auth.loginUrl || "/contact";

  return (
    <Link
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href={href}
    >
      {text || defaultText}
    </Link>
  );
};

export default ButtonSignin;
