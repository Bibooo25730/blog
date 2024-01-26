import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../../components/layout';
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: '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',dangerouslyAllowBrowser: true});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();

export default function Link() {
  return (
    <Layout>
      <Head>
        <title>{`链接 - ${process.env.name}`}</title>
        <meta
          name="description"
          content={process.env.description}
        />
      </Head>
        <p className='text-lg text-neutral-500 dark:text-neutral-400'>前有朋友。</p>
        <ul className='flex flex-wrap py-6'>
          {process.env.links.map(({ name, url, img, text }) => (
          <li className='group basis-1/2 md:basis-1/3 text-center my-4 p-2' key={name}>
            <a href={url} target="_blank" rel="noopener">


              <Image
                className='group-hover:scale-110 group-hover:shadow-xl group-hover:border-blue-600 group-hover:dark:border-blue-500 group-hover:group bg-neutral-500 dark:bg-neutral-400 border-2 mx-auto transition-all'
                src={img}
 height={108}
 width={108}
 alt={name}

            
         
              />
              <h2 className='text-lg transition-all'>{name}</h2>
              <span className='text-neutral-500 dark:text-neutral-400 transition-all'>{text}</span>
            </a>
          </li>
          ))}
        </ul>
      
    </Layout>
  );
}