import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../styles/faq.module.css'
import * as utils from "../src/utils"

export function Meta() {
  return <Head>
    <title key="title">Saito FAQs</title>
    <meta name="description" content="Saito Frequently Asked Questions" />
    <link rel="icon" href="/favicon.ico" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9E7G7PSM9Z"></script>
    <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9E7G7PSM9Z')`,}} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Saito FAQS" />
    <meta name="twitter:description" content="Saito is a new layer-one blockchain with a breakthrough new consensus model." />
    <meta name="twitter:image" content="https://b11f-50-45-151-29.ngrok.io/social.png" />
  </Head>
}

export function Header() {
  return (
      <div className={styles.header}>
        <img src="/red-cube.png" alt="Saito Cube" className={styles.cube} />
        <Link href='/' passHref>
          <img src="/logo.png" alt="Saito FAQs" />
        </Link>
      </div>
  )
}

export function Footer() {
  return (
    <footer className={styles.disclaimer}>
      created by <a href="https://twitter.com/0xluminous">0xluminous</a>
    </footer>
  );
}

export function RelatedTags(grouped) {
  return (
    <aside className={styles.subcontentWrapper}>
      <div className="columns is-multiline">
        {Object.keys(grouped).map(group => {
          return <div key={group} className="column is-full mb-6">
            <h2 className="title is-5 mb-1"><Link href={"/tag/" + group}><a>Other {utils.capitalizeFirstLetter(group)} Questions</a></Link></h2>
            {grouped[group].map(l => {
              return <Link key={l.slug} href={"/faq/" + l.slug}><a className={styles.faqTitle}>{l.data.title}</a></Link>
            })}
          </div>
        })}
      </div>
    </aside>
  );
}

export function Sidebar() {
  const links = [
    {
      iconSrc: '/file-pdf.svg',
      href: 'https://saito.io/saito-whitepaper.pdf',
      title: 'Saito Whitepaper'
    },
    {
      iconSrc: '/file-pdf.svg',
      href: 'https://saito.io/saito-litepaper.pdf',
      title: 'Saito Litepaper'
    },
    {
      iconSrc: '/youtube.svg',
      href: 'https://www.youtube.com/watch?v=C81D6B9sgH8',
      title: 'Openness not Decentralization'
    },
    {
      iconSrc: '/medium.svg',
      href: 'https://0xluminous.com/the-zen-of-saito-5d7ca977ac4f',
      title: 'The Zen of Saito'
    },
    {
      iconSrc: '/fire.svg',
      href: 'https://github.com/0xluminous/awesome-saito',
      title: 'Awesome Saito'
    },
    {
      iconSrc: '/arcade.svg',
      href: 'https://saito.io/arcade/',
      title: 'Saito Arcade'
    },
  ]
  return (
    <aside className={styles.sidebar}>
      <p>
        <span className="saito"><a href="https://saito.io">Saito</a></span> is a new layer-one blockchain with a breakthrough new consensus model.
      </p>
      <ul>
        {links.map(link => {
          return (
            <li key={link.href}>
              <span className="icon-text">
                <span className="icon">
                  <Image width={22} height={22} alt={link.title} src={link.iconSrc} />
                </span>
                <a href={link.href}>{link.title}</a>
              </span>
            </li>
          )
        })}
      </ul>
    </aside>
  );

}

function getTagClassForSize(size) {
  if (size >= 4) {
    return "is-large"
  } else if (size > 1) {
    return "is-medium"
  } else {
    return "is-normal"
  }
}

export function TagCloud({ cloud }) {
  return <div className={styles.tagcloud}>
    <div className="tags">
      {cloud.map(obj => {
        const className = `tag ${getTagClassForSize(obj[1])}`;
        return <span key={obj[0]} className={className}><Link href={"/tag/" + obj[0]}>{obj[0]}</Link></span>
      })}
    </div>
  </div>
}
