
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';


// Use Crudlify to create a REST API for any collection
//crudlify(app, {flashCard: flashCardYup})

// bind to serverless runtime
export default app.init();
