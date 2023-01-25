import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicServiceDetail = dynamic(() => import('./ServiceDetail'), {
  suspense: true,
});

function HomeServiceDetail({ service }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicServiceDetail service={service} />
    </Suspense>
  );
}

export async function getStaticPaths() {
  try {
    const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await rs.json();
    const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return { statusCode: 404 };
  }
}

export async function getStaticProps({ params }) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services/${params.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const service = await rs.json();
  return { props: { service } };
}

HomeServiceDetail.propTypes = {
  service: PropTypes.node.isRequired,
};

export default HomeServiceDetail;
