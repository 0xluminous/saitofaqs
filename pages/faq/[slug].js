import Link from "next/link"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Meta, Header } from "../../src/components"
import styles from "../../styles/faq.module.css"
import * as faqs from "../../src/faqs"

const componentsOverride = { }

export default function Post({ source }) {
  return (
    <div>
      <Meta />

      <div className="container">
          <div className={styles.wrapper}>
            <div className="columns">
              <div className="column">
                <Header />
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className="content">
                <MDXRemote {...source} components={componentsOverride} />
                <img className={styles.backIcon} src="/back-arrow.svg" /> <Link href="/">back to home</Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const faq = faqs.getBySlug(params.slug);
  const source = await serialize(faq.content)
  return { props: { source } };
}

export async function getStaticPaths() {
  const list = faqs.getAll();
  return {
    paths: list.map((faq) => {
      return {
        params: {
          slug: faq.slug
        }
      }
    }),
    fallback: false,
  };
}

