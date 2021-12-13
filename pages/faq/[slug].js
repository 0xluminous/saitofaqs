import Link from "next/link"
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Meta, Header, RelatedTags, Sidebar, Footer } from "../../src/components"
import styles from "../../styles/faq.module.css"
import * as faqs from "../../src/faqs"
import {remark} from 'remark'
import strip from 'strip-markdown'

const componentsOverride = { }

export function FAQ({ source, faq }) {
  const tagClasses = [styles.tag, 'tag'].join(' ')
  return (<main className={styles.contentWrapper}>
            <div className="content">
              <h1>{faq.data.title}</h1>
              <MDXRemote {...source} components={componentsOverride} />
              {(faq.data.tags && faq.data.tags.length > 0) && <div className="tags">
                {faq.data.tags.map(tag => {
                  if (!tag) { return; }
                  const href = `/tag/${tag}`;
                  return <span key={tag} className={tagClasses}><Link href={href}>{tag}</Link></span>;
                })}
              </div>}
              <div className={styles.meta}>
                <img className={styles.backIcon} src="/back-arrow.svg" /> <Link href="/">back home</Link>
                <div className={styles.sourceLink}>
                  <Link href={faq.data.source}>source</Link>
                </div>
                <div className={styles.editLink}>
                  <Link href={"https://github.com/0xluminous/saitofaqs/edit/main/faqs/" + faq.slug + ".md"}>edit</Link>
                </div>
              </div>
            </div>
          </main>)
}

export default function FAQPage({ source, faq, related, stripped }) {
  return (
    <div>
      <Meta />
      <Head>
        <title key="title">{faq.data.title} — Saito FAQs</title>
        <meta name="twitter:title" content={faq.data.title + " — Saito FAQS"} />
        <meta name="twitter:description" content={stripped.substr(0, 250)} />
        <meta name="twitter:image" content="https://b11f-50-45-151-29.ngrok.io/social.png" />
      </Head>

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <Header />
            <FAQ faq={faq} source={source} />
            <RelatedTags {...related} />
            <Sidebar />
            <Footer />
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const faq = faqs.getBySlug(params.slug);
  const source = await serialize(faq.content);
  const related = faqs.getRelated(faq);

  const stripped = (await remark()
    .use(strip)
    .process(faq.content)).value;

  return { props: { source, faq, related, stripped } };
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

