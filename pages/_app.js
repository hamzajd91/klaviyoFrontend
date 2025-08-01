import Head from 'next/head';
import '../styles/Home.module.css';
import '../styles/globalStyles.css';
import '../styles/signIn.css';
import '../styles/getCampaigns.css';
import '../styles/campaignDetails.css';



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Klaviyo Stats</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Gnf0B8e6p1+8ozDkX91CQCv1GZJX3uExSzN4Yc+CU1KZjR7WXYrEd09TZ+XrQm0y"
          crossOrigin="anonymous"
        />
         <link 
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
         rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
