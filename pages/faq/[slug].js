import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import * as faqs from "../../src/faqs"

const componentsOverride = { }

export default function Post({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={componentsOverride} />
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

