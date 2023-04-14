const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("crud server is running now ");
});

app.listen(port, () => {
    console.log("port is running", port);
});
const uri = "mongodb+srv://AddEmployee:PRf0m62GJncup0uO@cluster0.8gtonc3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    const employeesCollection = client.db("crudOperation").collection('employee')

    //post method
    app.post("/employee", async (req, res) => {
        const employee = req.body;
        const result = await employeesCollection.insertOne(employee);
        res.send(result);
    });

    // get method
    app.get("/employees", async (req, res) => {
        const cursor = employeesCollection.find({});
        const employees = await cursor.toArray();
        res.send(employees);
    });

    app.get("/employee/:id", async (req, res) => {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const employee = await employeesCollection.findOne(query);
        res.send(employee);
    });


    // update employee 
    app.put("/employee/:id", async (req, res) => {
        const { id } = req.params
        const query = { _id: new ObjectId(id) }
        const options = { upsert: true }
        const employee = req.body
        const updateEmployee = {
            $set: {
                firstName: employee?.firstName,
                lastName: employee?.lastName,
                email: employee?.email,
                salary: employee?.salary,
                date: employee?.date 
            }
        }
        const result = await employeesCollection.updateOne(query, updateEmployee, options)
        res.send(result)
    })


    //delete method
    app.delete("/employee/:id", async (req, res) => {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await employeesCollection.deleteOne(query);
        res.send(result);
    });
}
run().catch(err => {
    console.log(err);
});


