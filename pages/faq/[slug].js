import Link from "next/link"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Meta, Header, RelatedTags } from "../../src/components"
import styles from "../../styles/faq.module.css"
import * as faqs from "../../src/faqs"

const componentsOverride = { }

export default function Post({ source, faq, related }) {
  return (
    <div>
      <Meta />

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.contentWrapper}>
              <div className="content">
                <h1>{faq.data.title}</h1>
                <MDXRemote {...source} components={componentsOverride} />
                {(faq.data.tags && faq.data.tags.length > 0) && <div className={styles.tags}>
                  {faq.data.tags.map(tag => {
                    if (!tag) { return; }
                    const value = `#${tag}`;
                    const href = `/tag/${tag}`;
                    return <span key={tag} className={styles.tag}><Link href={href}>{value}</Link></span>;
                  })}
                </div>}
                <div className={styles.meta}>
                  <img className={styles.backIcon} src="/back-arrow.svg" /> <Link href="/">back to home</Link>
                  <div className={styles.sourceLink}>
                    <Link href={faq.data.source}>source</Link>
                  </div>
                  <div className={styles.editLink}>
                    <Link href={"https://github.com/0xluminous/saitofaqs/edit/main/faqs/" + faq.slug + ".md"}>edit</Link>
                  </div>
                </div>
              </div>
            </div>
            <RelatedTags {...related} />
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const faq = faqs.getBySlug(params.slug);
  const source = await serialize(faq.content);
  const related = faqs.getRelated(faq);
  return { props: { source, faq, related } };
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

