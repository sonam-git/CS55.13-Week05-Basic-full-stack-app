import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
import Image from 'next/image';


export async function getStaticProps() {
  const allData = getSortedList();
  return {
    props: {
      allData
    }
  }
}
export default function Home({ allData }) {
  return (
      <Layout home>
        <h1>The 70's Cars</h1>
        <p><img src="/vintage.jpeg" className = "img-fluid" alt="vintage car"/></p>
        <div className="list-group">
          {allData ?
          allData.map(({ id, name }) => (
            <Link key={id} href={`/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))
          : null }
        </div>
      </Layout>
  );
}