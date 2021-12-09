import Head from 'next/head'
import Link from "next/link"
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

export function RelatedTags(grouped) {
  return (
    <div className={styles.subcontentWrapper}>
      <div className="columns is-multiline">
        {Object.keys(grouped).map(group => {
          return <div key={group} className="column mb-6">
            <h2 className="title is-5 mb-1">Other {utils.capitalizeFirstLetter(group)} Questions</h2>
            {grouped[group].map(l => {
              return <Link key={l.slug} href={"/faq/" + l.slug}><a className={styles.faqTitle}>{l.data.title}</a></Link>
            })}
          </div>
        })}
      </div>
    </div>
  );

  /*
    <div className={styles.subcontentWrapper}>
      {Object.keys(related).map(tag => {
        return <div key={tag} className={styles.relatedTagsGroup}>
          <h2 className="title is-5 mb-2 mt-2">Other {utils.capitalizeFirstLetter(tag)} Questions</h2>
          {related[tag].map(faq => {
            return <div key={faq.slug}>
              <a href={"/faq/" + faq.slug}>{faq.data.title}</a>
            </div>
          })}
        </div>
      })}
    </div>
  )
  */
}
