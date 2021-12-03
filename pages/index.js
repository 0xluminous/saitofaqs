import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/faq.module.css"
import { Meta, Header } from "../src/components"
import * as faqs from "../src/faqs"

export default function Home(props={}) {
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
                  {props.list.map(l => {
                    return <Link key={l.slug} href={"faq/" + l.slug}><a className={styles.faqTitle}>{l.data.title}</a></Link>
                  })}
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const list = faqs.getAll();
  console.log(list);
  return { props: { list } };
}

