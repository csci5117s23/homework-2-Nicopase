import Link from 'next/link'

export default function NotFound() {
    
    return <>
    <div id="not-found">
        <h2>404</h2>
        <h4>Not Found</h4>
        <p>The requested URL could not be found on this server.</p>
    </div>
    <div>
        <button class="pure-button"> <Link href="todos/">Take me to my todo list</Link></button>
      </div>
    </>
}