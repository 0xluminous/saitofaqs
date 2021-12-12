import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../../styles/faq.module.css"
import * as components from "../../src/components"
import * as faqs from "../../src/faqs"
import * as tags from "../../src/tags"
import * as utils from "../../src/utils"

const componentsOverride = { }

export default function FAQs({ grouped }) {
  return (
    <div>
      <components.Meta />
      <Head>
        <meta name="twitter:title" content={"All Saito FAQS"} />
      </Head>


      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <components.Header />

            <div className={styles.contentWrapper}>
              <components.RelatedTags {...grouped} />
            </div>

            <components.Sidebar />
            <components.Footer />
            
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const grouped = faqs.getByTags(tags.getAll());
  return { props: { grouped } };
}

