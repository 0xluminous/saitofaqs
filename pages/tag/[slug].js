import Link from "next/link"
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { Meta, Header } from "../../src/components"
import styles from "../../styles/faq.module.css"
import * as tags from "../../src/tags"
import * as utils from "../../src/utils"

const componentsOverride = { }

export default function Tag({ slug, list }) {
  return (
    <div>
      <Meta />
      <Head>
        <title key="title">{utils.capitalizeFirstLetter(slug)} — Saito FAQs</title>
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
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const list = tags.getBySlug(params.slug);
  return { props: { list, slug: params.slug } };
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

