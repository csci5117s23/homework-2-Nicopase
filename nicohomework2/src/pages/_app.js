import {
  ClerkProvider,
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn
} from "@clerk/nextjs";
import '@/styles/todolist.css'
import '@/styles/globals.css'
import 'purecss';

function Header() {
  const {  user } = useUser()

  return (
    <header
    >
      <div class="header" >
        <div class="home-menu pure-menu pure-menu-horizontal">
          <div class="pure-g"> 
            <div class="pure-u-20-24">
              <a class="pure-menu-heading" >Nico's To-do List</a>
            </div>
            <div class="pure-u-4-24">
              <SignedIn  redirectUrl={'/todos'}>
                {/* Mount the UserButton component */}
                {user && <div id="greetings">Hello {user.username}!</div>}
                <UserButton />
              </SignedIn>
              <SignedOut redirectUrl={'/'}>
                {/* Signed out users get sign in button */}
                <SignInButton />
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Header />
      <Component {...pageProps} />
    </ClerkProvider>
  );

}