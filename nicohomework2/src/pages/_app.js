import Header from "@/components/Header";
import {
  ClerkProvider,
  ClerkLoaded,
} from "@clerk/nextjs";
import '@/styles/globals.css'
import '@/styles/todolist.css'
import '@/styles/todoid.css'
import '@/styles/404.css'
import 'purecss';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
       <ClerkLoaded>
        <Header />
        <Component {...pageProps} />
      </ClerkLoaded>
    </ClerkProvider>
  );

}