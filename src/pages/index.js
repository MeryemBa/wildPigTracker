
import dynamic from "next/dynamic";
import Layout from "../component/layout/layout-comp";
import InfoButton from "../component/app-inforamtion/app-info-comp";
import Loader from "../component/loader/loader-comp";




const Map = dynamic(() => import("../component/map/map-comp"), {
  loading: () => <Loader message="Loding Map ..."/>,
  ssr: false
});



export default function IndexPage() {
 
     
  
  
  
  return (
    
      <Layout>
        <Map />
    <InfoButton/>
  
        </Layout>
  );
}


