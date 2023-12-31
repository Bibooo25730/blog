import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import {useEffect,useState} from "react";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // init
  return {
    props: {
      allPostsData: allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(allPostsData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const currentPostsData = allPostsData.slice(startIndex, endIndex);
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

    }
  }

  const [pageBoolean,setPageBoolean] = useState(false)
  useEffect(()=>{
    if(currentPage<=1){
      setPageBoolean(false)
    }else{
      setPageBoolean(true)
    }

  },[currentPage])
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
          {currentPostsData.map(({ id, date, title, categories, excerpt }) => (
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
            {pageBoolean?<div  onClick={handlePreviousPage} className="nes-badge m-0 w-1/3 ">
              <span className="is-dark left-0 text-lg">上一页</span>
            </div>:''}

            <Link className='nes-badge m-0  w-1/3' href={'/pages/archives'}>
             <span className='is-error left-0 text-lg'>所有文章</span>
            </Link>
            <div  onClick={handleNextPage} className="nes-badge m-0 w-1/3">
              <span className="is-dark left-0 text-lg">下一页</span>
            </div>
          </li>
        </ul>
    </Layout>
  );
}
