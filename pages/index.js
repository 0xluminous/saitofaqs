import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/faq.module.css"
import * as components from "../src/components"
import * as faqs from "../src/faqs"
import * as tags from "../src/tags"
import * as utils from "../src/utils"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const componentsOverride = { }

export function HomepageFAQ({ source, faq }) {
  return <div className="content">
    <MDXRemote {...source} components={componentsOverride} />
  </div>
}

export default function Home({ priority, grouped, cloud }) {
  return (
    <div>
      <components.Meta />

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <components.Header />
            <div className={styles.contentWrapper}>
                <div className={styles.home}>
                  {priority.map(props  => {
                    return <HomepageFAQ key={props.faq.slug} {...props} />
                  })}

                </div>
            </div>

            <components.Sidebar />
            <div className={styles.genericSubcontentWrapper}>
              <Link href="/faq/all"><a className={styles.viewAllQuestionsLink}>View all frequently asked questions</a></Link> <img className={styles.backIcon} src="/forward-arrow.svg" />
            </div>
            <components.TagCloud cloud={cloud} />
            <components.RelatedTags {...grouped} />

            <components.Footer />
            
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {

  const cloud = tags.getCloud();

  const grouped = faqs.getByTags(tags.getAll());

  const slugs = [
    "what-is-saito",
    "why-do-we-need-another-blockchain",
    "why-is-openness-more-important-than-decentralization",
    "whats-wrong-with-bitcoin",
  ];

  const priority = [];
  for (const slug of slugs) {
    const faq = faqs.getBySlug(slug);
    const content = `${faq.content.trim()} <a href="/faq/${faq.slug}/">#</a>`;
    const source = await serialize(content);
    priority.push({ faq, source });
  }

  return { props: { priority, grouped, cloud } };
}

