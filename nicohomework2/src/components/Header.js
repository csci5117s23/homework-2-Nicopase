import {
    ClerkProvider,
    ClerkLoaded,
    useUser,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function Header() {
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