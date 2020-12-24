import {connect} from "../../../utils/database";

export default async  (req, res) => {

try {
    const {db}= await connect();
    const points =await db.collection("points").find().toArray();
    
     res.json({points});
  
    
} catch (e) {
    res.statusCode(500);
    res.json({error:"There is an error on the server"})
    
}

}