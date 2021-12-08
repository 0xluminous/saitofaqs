import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/faq.module.css'
import * as utils from "../src/utils"

export function Meta() {
  return <Head>
    <title key="title">Saito FAQs</title>
    <meta name="description" content="Saito Frequently Asked Questions" />
    <link rel="icon" href="/favicon.ico" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9E7G7PSM9Z"></script>
    <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9E7G7PSM9Z')`,}} />
  </Head>
}

export function Header() {
  return (
      <div className={styles.header}>
        <img src="/red-cube.png" alt="Saito Cube" className={styles.cube} />
        <a href="/">
          <img src="/logo.png" alt="Saito FAQs" />
        </a>
      </div>
  )
}

export function RelatedTags(related) {
  return (
    <div className={styles.relatedTags}>
      {Object.keys(related).map(tag => {
        return <div className={styles.relatedTagsGroup}>
          <h2 className="title is-5 mb-2 mt-2">Other {utils.capitalizeFirstLetter(tag)} Questions</h2>
          {related[tag].map(faq => {
            return <div>
              <a href={"/faq/" + faq.slug}>{faq.data.title}</a>
            </div>
          })}
        </div>
      })}
    </div>
  )
}
