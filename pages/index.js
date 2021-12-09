import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/faq.module.css"
import { Meta, Header } from "../src/components"
import * as faqs from "../src/faqs"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const componentsOverride = { }

export function HomepageFAQ({ source, faq }) {
  return (
              <div className="content">
                <MDXRemote {...source} components={componentsOverride} />
              </div>);
}

export default function Home({ list }) {
  return (
    <div>
      <Meta />

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.contentWrapper}>
                <div className={styles.home}>
                  {list.map(props  => {
                    return <HomepageFAQ key={props.faq.slug} {...props} />
                  })}
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const list = [];

  const slugs = [
    "what-is-saito",
    "why-do-we-need-another-blockchain",
  ];

  for (const slug of slugs) {
    const faq = faqs.getBySlug(slug);
    const content = `${faq.content.trim()} <a href="/faq/${faq.slug}/">#</a>`;
    const source = await serialize(content);
    list.push({ faq, source });
  }

  return { props: { list } };
}

