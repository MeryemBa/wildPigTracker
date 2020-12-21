import App,{Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import "../styles/globals.css";
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
        const description = 'Creating a non-SSR map component inside a Next.js project.';

        const title = `Next.js + Mapbox Demo `;
        
        return (
            <Container>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link href="../../public/favicon.ico" rel="shortcut icon" />
                    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />
                  

                   <meta content={description} name="description" />
                    <meta property="og:title" content={title} />
                    <meta property="og:image" content="/static/banner.jpg" />
                    <meta content="en_US" property="og:locale" />
                    <meta content={description} property="og:description" />
                  
                </Head>
                
                <Component {...pageProps} />
              
              
            </Container>
        );
    }
}

export default MyApp;