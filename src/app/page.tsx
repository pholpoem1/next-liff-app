"use client";

import liff from "@line/liff";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface IProfile {
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
  userId: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<IProfile | undefined>();
  const router = useRouter();

  const getInitLiff = async () => {
    await liff.init({
      liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID as string
    });

    if (!liff.isLoggedIn()) {
      liff.login();
      setIsLoggedIn(false);
      return false;
    }

    setIsLoggedIn(true);

    const response = (await liff.getProfile()) as IProfile;

    setProfile(response);
  };

  useEffect(() => {
    getInitLiff();
  }, []);

  const onClickLogout = async () => {
    liff.logout();
    setIsLoggedIn(false);
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!isLoggedIn && !profile ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            Hello : {profile?.displayName} ({profile?.statusMessage})
          </div>

          <Image
            src={profile?.pictureUrl || ""}
            height={200}
            width={200}
            alt="img-profile"
          />

          <button
            className="rounded-sm p-2 bg-blue-400	text-white"
            onClick={() => onClickLogout()}
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
