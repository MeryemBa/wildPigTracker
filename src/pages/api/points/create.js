import {connect} from "../../../utils/database";

export default async  (req, res) => {

try {
 const {db}= await connect();
 const {point:{ latitude, longitude }}=req.body;

 const result = await db.collection("points").insertOne({
  location: {
    type: "Point",
    coordinates: [longitude, latitude],
  },
  createdAt: new Date(),
});


res.status(201);
res.json({ point: result.ops[0] });


  
  
} catch (error) {
  res.statusCode(500);
  res.json({error:"There is an error on the server"})
  
}

  
}
