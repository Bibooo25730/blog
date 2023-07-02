import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import {useEffect,useState} from "react";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData: allPostsData.slice(0, 5),
    },
  };
}

export default function Home({ allPostsData }) {
  const [pageBoolean,setPageBoolean] = useState(false)
  useEffect(()=>{
    setPageBoolean(true)
  },[])
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{process.env.name}</title>
        <meta
          name="description"
          content={process.env.description}
        />
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
        <ul className='divide-y'>
          {allPostsData.map(({ id, date, title, categories, excerpt }) => (
          <li className='py-6' key={id}>
            <Link href={`/posts/${id}`} className='block text-2xl hover:text-blue-600 dark:hover:text-blue-500 transition-all'>
              {title}
            </Link>
            <div className='py-6'>
              {excerpt}
            </div>
            <div className='space-x-2 text-neutral-500 dark:text-neutral-400'>
              <Date dateString={date} />
              <span>{categories}</span>
            </div>
          </li>
          ))}
          <li className='text-center text-neutral-500 dark:text-neutral-400  py-6 text-xs  md:text-lg'>
            {pageBoolean?<div  className="nes-badge m-0 w-1/3 ">
              <span className="is-dark left-0 text-lg">上一页</span>
            </div>:<div className="nes-badge m-0 invisible w-1/3">
              <span className="is-dark left-0 text-lg">上一页</span>
            </div>}

            <Link className='nes-badge m-0  w-1/3' href={'/pages/archives'}>
             <span className='is-error left-0 text-lg'>所有文章</span>
            </Link>
            <div  className="nes-badge m-0 w-1/3">
              <span className="is-dark left-0 text-lg">下一页</span>
            </div>
          </li>
        </ul>
    </Layout>
  );
}
