import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Login({ providers }) {
  //   console.log(providers);
  const router = useRouter();

  const { data, status } = useSession();
  if (status == "loading") {
    return "";
  }
  if (data) {
    router.push("/");
  }
  console.log(data, status);
  return (
    <div className="flex bg-slate-500 items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="bg-twitterWhite rounded-full p-3 flex items-center"
          >
            <img src="/github.png" alt="github" className="h-8" />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
