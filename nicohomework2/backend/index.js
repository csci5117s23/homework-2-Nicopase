
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import * as yup from 'yup';

const todo = yup.object().shape({
    id: yup.string().required(),
    userId: yup.string().required(),
    description: yup.string().required(),
    completed: yup.boolean().required()
  });

async function getTodos(req, res) {
    const conn = await Datastore.open();
    const userId = req.query.userId;
    const options = {
        filter: {"userId": userId}
    }
    console.log(req.body)
    conn.getMany('todos', options).json(res);
}

async function createTodo(req, res) {
    const conn = await Datastore.open();
    const newTodo = await conn.insertOne("todos", req.body);
    console.log("req.body: " + JSON.stringify(req.body));
    res.json(newTodo);
}

async function deleteTodos(req, res) {
    const conn = await Datastore.open();
    const userId = req.query.userId;
    const options = {
        filter: {"userId": userId}
    }
    const data = await conn.removeMany('customer', options);
    res.json(data);
}

app.get("/todos", getTodos);
app.post("/todos", createTodo);
//app.delete('/deleteTodo', deleteTodos);

// Use Crudlify to create a REST API for any collection
crudlify(app, { todo });

// bind to serverless runtime
export default app.init();
