import Head from "next/head";

function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="A Nextjs app where you can select the Astronomy Picture of the Day by NASA"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>APOD APP</title>
    </Head>
  );
}

export default Meta;
