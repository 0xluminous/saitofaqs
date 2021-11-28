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
    <br />
    <br />
    <br />
    <br />
    <br />
        <h1 className={styles.title} align="center">
          Saito FAQs
        </h1>

        <p className={styles.description} align="center">
          coming Soon....
        </p>

      </main>
    </div>
  )
}

/*

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const components = { }

export default function Post({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component'
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
*/
