import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <button class="pure-button"> <Link href="todos/">Take me to my todo list</Link></button>
      </div>
    </>
  )
}
