"use client";
import Error from 'next/error';

function Page({ statusCode }: any) {
  console.log(`************ => Page => statusCode:`, statusCode);
  return <Error statusCode={statusCode}></Error>;
}

Page.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
