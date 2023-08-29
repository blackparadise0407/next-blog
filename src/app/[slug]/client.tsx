"use client";

import { useRouter } from "next/navigation";

import useHotkey from "../hooks/useHotkey";

export default function Client() {
  const router = useRouter();
  useHotkey(["q", "backspace"], () => {
    router.push("/");
  });

  return <></>;
}
