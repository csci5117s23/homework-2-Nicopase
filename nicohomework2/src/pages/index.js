import React, { useEffect } from 'react';
import { useUser} from "@clerk/nextjs";
import { useRouter } from 'next/router';

export default function Home() {
  const { user, isSignedIn} = useUser()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/todos");
    }
  }, [user]);

  return (
    <>
    {!isSignedIn && 
    <div>
      <h2>Welcome to my To-Do application!</h2>
      <h3>Please use the login button in the header to use the site</h3>
    </div>}
    </>
  )
}
