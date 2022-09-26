import Head from 'next/head';
import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      {/* render details about one entity in cars.json saved in itemData */}
      <article className="card col-6">
        <h2>Vehicle Detail</h2>
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <Image
              src={`/images/${itemData.image}`}
              width={150}
              height={100}
              layout="responsive"
              className="card-img"
              alt={`${itemData.name}`}
            />
          <br></br>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.year}</h6>
          <p className="card-text">{itemData.origin}</p>
          <a href={'mailto:' + itemData.email} className="card-link">{itemData.email}</a>
        </div>
      </article>
      {/* render details about all other entities in cars.json related to id */}
      <div className="list-group col-6">
        {/* check for existence of itemData.related property */}
        {itemData.related ? 
          <h2>Related Vehicles</h2> : null
        }
        {itemData.related ? 
          itemData.related.map(
            ({ id, name }) => (
              <Link key={id} href={`/${id}`}>
                <a className="list-group-item list-group-item-action">{name}</a>
              </Link>
            )
          )
          : null
        }
      </div>
    </Layout>
  );
}