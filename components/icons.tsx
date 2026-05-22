import { FaGithub, FaLinkedin } from "react-icons/fa";

export function GithubIcon({ size = 18 }: { size?: number }) {
  return <FaGithub size={size} />;
}

export function LinkedinIcon({ size = 18 }: { size?: number }) {
  return <FaLinkedin size={size} />;
}
