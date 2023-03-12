require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(bodyParser());

//===MongoDB===//
// UQpn4YPmaciFztzn;

// const { success } = require("daisyui/src/colors");
const uri = `mongodb+srv://userdashboard:EhgKjYptDK9kblMf@cluster0.otp6uvz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//=====Function to connect Mongo======//
async function run() {
  try {
    await client.connect();
    console.log("Connected!");
  } catch (error) {
    console.error(error);
  }
}
run().catch((error) => console.error(error));

//====database collections=====//
const usersCollection = client.db("contentPoster").collection("users");
const contentCollection = client.db("contentPoster").collection("content");

//===Post User===//
app.post("/users", async (req, res) => {
  try {
    await usersCollection.insertOne(req.body);
    res.send({
      success: true,
      message: "Successfully created user account!",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
});

// //==> Get All Users <===//
// app.get("/users", async (req, res) => {
//   try {
//     const result = await usersCollection.find({}).toArray();
    
//     res.send({ success: true, data: data });
//   } catch (error) {
//     console.log(error);
//     res.send({success:false,error:error.message})
//   }
// })

//==Get User===//
app.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await usersCollection.findOne({ email: email });
    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
});

//===Post Content===//
app.post("/content", async (req, res) => {
  try {
    await contentCollection.insertOne(req.body);
    res.send({
      success: true,
      message: "Successfully created a post!",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
});

// ===> get users posts <==== //
app.get("/content/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await contentCollection.find({ email: email }).toArray();
    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
});

//===Post Content===//
app.get("/content", async (req, res) => {
  try {
    const result = await contentCollection.find({}).toArray();
    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
});

//=====Delete review=====//
app.delete("/content/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    await contentCollection.deleteOne(query);
    res.send({ success: true, message: "Successfully deleted!" });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error: error.message,
    });
  }
});




//===> Initial section <===//
app.get("/", (req, res) => {
    res.send("Server is running!!")
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})