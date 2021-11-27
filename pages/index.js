import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Saito FAQs</title>
        <meta name="description" content="Saito Frequently Asked Questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Saito FAQs
        </h1>

        <p className={styles.description}>
          Coming Soon....
        </p>

      </main>
    </div>
  )
}
