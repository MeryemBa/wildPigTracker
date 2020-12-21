import dynamic from "next/dynamic";
import Layout from "../component/layout/layout-comp";




const Map = dynamic(() => import("../component/map/map-comp"), {
  loading: () => "Loading...",
  ssr: false
});


export default function IndexPage() {
  

  return (
    
      <Layout>
        <Map />
    
        </Layout>
  );
}


