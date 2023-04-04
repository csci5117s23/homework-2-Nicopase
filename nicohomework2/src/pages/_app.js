import '@/styles/todolist.css'
import '@/styles/globals.css'
import 'purecss';

export default function App({ Component, pageProps }) {
  return <>
  <header>
    <div class="header">
      <div class="home-menu pure-menu pure-menu-horizontal">
      <a class="pure-menu-heading" >Nico's Todo List</a>
      </div>
    </div>
  </header>

  <Component {...pageProps} />
  </>
}
