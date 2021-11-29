import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Meta, Header } from "../src/components"
import * as faqs from "../src/faqs"

export default function Home(props={}) {
  return (
    <div>
      <Meta />

      <div className="fluid-container">
          <div className="columns">
            <div className="column">
              <div className={styles.wrapper}>
                <Header />
                {props.list.map(l => {
                  return <a href={"faq/" + l.slug}>{l.slug}</a>
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

