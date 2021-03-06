import Link from "next/link"
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { Meta, Header, Sidebar, Footer, RelatedTags } from "../../src/components"
import styles from "../../styles/faq.module.css"
import * as faqs from "../../src/faqs"
import * as tags from "../../src/tags"
import * as utils from "../../src/utils"

const componentsOverride = { }

export default function Tag({ slug, list, grouped }) {
  return (
    <div>
      <Meta />
      <Head>
        <title key="title">{utils.capitalizeFirstLetter(slug)} — Saito FAQs</title>
        <meta name="twitter:title" content={"Saito " + utils.capitalizeFirstLetter(slug) + " FAQS"} />
      </Head>

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.contentWrapper}>
              <div className="content">
                <h1 className="title">Saito {utils.capitalizeFirstLetter(slug)} FAQs</h1>
                {list.map(faq => {
                  return <Link key={faq.slug} href={"/faq/" + faq.slug}><a className={styles.faqTitle}>{faq.data.title}</a></Link>
                })}
              </div>
            </div>
            <Sidebar />

            <RelatedTags {...grouped} />

            <Footer />
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const list = tags.getBySlug(params.slug);

  const allTags = tags.getAll();
  const grouped = faqs.getByTags(allTags);
  return { props: { list, slug: params.slug, grouped } };
}

export async function getStaticPaths() {
  const list = tags.getAll();
  return {
    paths: list.map((tag) => {
      return {
        params: {
          slug: tag
        }
      }
    }),
    fallback: false,
  };
}

