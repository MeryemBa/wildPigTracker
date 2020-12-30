import App,{Container} from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration'
import Head from 'next/head';
import React from 'react';
import "../styles/globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const queryClient = new QueryClient()
class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        const description = 'Creating a Wild Pig Tracker using MapBox.';

        const title = `Wild Pig Tracker `;
        
        return (
            <Container>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
                    <link href="/favicon.ico" rel="shortcut icon" />
                    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />
                  

                   <meta content={description} name="description" />
                    <meta property="og:title" content={title} />
            
                    <meta content="en_US" property="og:locale" />
                    <meta content={description} property="og:description" />
                  
                </Head>
                <QueryClientProvider client={queryClient}>
                
                <Hydrate state={pageProps.dehydratedState}>
         <Component {...pageProps} />
       </Hydrate>
                </QueryClientProvider>
              
            </Container>
        );
    }
}

export default MyApp;