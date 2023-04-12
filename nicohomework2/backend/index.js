
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';

const todo = yup.object().shape({
    id: yup.string().required(),
    userId: yup.string().required(),
    description: yup.string().required(),
    completed: yup.boolean().required(),
    createdAt: yup.date().required(),
});

const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)

async function getTodos(req, res) {
    const conn = await Datastore.open();
    const userId = req.query.userId;
    console.log("this is requested userId: " + userId)
    const options = {
        filter: {"userId": userId, "completed": false }
    }
    conn.getMany('todos',options).json(res);
}

async function getTodoItem(req, res) {
    const conn = await Datastore.open();
    const id = req.params.id;
    console.log("this is requested id: " + id)
    const data = await conn.getOne('todos',id);
    res.json(data);
}

async function getDoneTodos(req, res) {
    const conn = await Datastore.open();
    const userId = req.query.userId;
    console.log("this is requested userId: " + userId)
    const options = {
        filter: {"userId": userId, "completed": true }
    }
    conn.getMany('todos',options).json(res);
}

async function createTodo(req, res) {
    const conn = await Datastore.open();
    const newTodo = await conn.insertOne("todos", req.body);
    console.log("req.body: " + JSON.stringify(req.body));
    res.json(newTodo);
}

async function updateCompletion(req, res) {
    const conn = await Datastore.open();
    const { completed } = req.body;
    const id = req.params.id;
    const updatedTodo = await conn.updateOne("todos", id, { completed });
    res.json(updatedTodo);
}

async function updateDescription(req, res) {
    const conn = await Datastore.open();
    const { description } = req.body;
    const id = req.params.id;
    const updatedTodo = await conn.updateOne("todos", id, { description });
    res.json(updatedTodo);
}

async function deleteTodo(req, res) {
    const conn = await Datastore.open();
    const itemId = req.params.itemId;
    console.log("this is requested id: " + itemId);
    const deletedTodo = await conn.removeOne('todos', itemId);
    res.json(deletedTodo);
}

app.get("/todos", getTodos);
app.post("/todos", createTodo);
app.get("/done", getDoneTodos);
app.put("/todos/:id", updateCompletion);
app.get("/todo/:id", getTodoItem);
app.put("/todo/:id", updateDescription);
app.delete("/todo/:itemId", deleteTodo);

// Use Crudlify to create a REST API for any collection
crudlify(app, { todo });

// bind to serverless runtime
export default app.init();
