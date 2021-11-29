import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export function Meta() {
  return <Head>
    <title>Saito FAQs</title>
    <meta name="description" content="Saito Frequently Asked Questions" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
}

export function Header() {
  return (
    <div className="columns">
      <div className="column">
          <div className={styles.header}>
            <img src="/cube.png" alt="Saito Cube" className={styles.cube} />
            <a href="/">
              <img src="/logo.png" alt="Saito FAQs" />
            </a>
          </div>
      </div>
    </div>
  )
}
