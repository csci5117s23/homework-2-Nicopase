import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useUser} from "@clerk/nextjs";
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Todos() {
    const [todoList, setTodoList] = useState([]);
    const [newTodoItem, setNewItem] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [iconVisible, setIconVisible] = useState(true);
    const { user } = useUser();
    const router = useRouter();

    const API_ENDPOINT = 'https://backend-w2cd.api.codehooks.io/dev/todos';
    const API_ENDPOINT_GET = 'https://backend-w2cd.api.codehooks.io/dev/todos?userId=';
    const API_KEY = "bb830a11-6df4-4ad7-a7cb-ad384a7f8144"

    useEffect(() => {
        if (!user) {
        router.replace("/");
        } else {
            fetchTodos();
        }
    }, [user]);

    async function fetchTodos() {
        try {
        const response = await fetch(API_ENDPOINT_GET+user.id, {
            method: 'GET',
            headers: {
                'x-apikey': API_KEY,
                // Add any other headers you need here
            },
            });
          const todos = await response.json();
          const sortedTodos = todos.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTodoList(sortedTodos);
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
    }

    const listTodoItems = todoList.map((item) => 
        <li key={item._id}>
            <input type="checkbox"
             id={`item-${item._id}`} 
             onChange={() => updateTodoItem(item._id, !item.completed)}
             />
            <Link href={`/todo/${item._id}`}>{item.description}</Link>
        </li>
    )

    async function addTodoItem() {
        try {
          const newTodo = {
            userId: user.id,
            description: newTodoItem,
            completed: false,
            createdAt: new Date(),
          };
          console.log(JSON.stringify(newTodo))
      
          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': API_KEY,
              // Add any other headers you need here
            },
            body: JSON.stringify(newTodo),
          });
      
          if (!response.ok) {
            throw new Error('Failed to create todo');
          }
      
          const todos = await response.json();

          // Update the todo list with the newly added todo item
          setTodoList([ todos, ...todoList]);
      
          // Clear the input and hide it
          setNewItem('');
          setInputVisible(false);
          setIconVisible(true);
        } catch (error) {
          console.error('Failed to create todo:', error);
        }
    }

    async function updateTodoItem(id, completed) {
        console.log("this is id: " + id);
        console.log("this is completed: " + JSON.stringify({completed}));
        try {
            const response = await fetch(`${API_ENDPOINT}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': API_KEY,
                },
                body: JSON.stringify({ completed }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
    
            const updatedTodo = await response.json();
            console.log("this is updatedTodo: " + JSON.stringify(updatedTodo))

            if (completed) {
                setTodoList(todoList.filter((todo) => todo._id !== id));
            }
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    }

    function toggleVisible() {
        setInputVisible(true);
        setIconVisible(false);
    }

    function cancelItem() {
        setNewItem("");
        setInputVisible(false);
        setIconVisible(true);
    }

    return <>
    <div id="todos-container">
        {iconVisible && (
        <div>
            <FontAwesomeIcon id="add-icon" icon={faCirclePlus} size="xl" onClick={toggleVisible} /> Add Todo Item
        </div>
        )}
        {inputVisible && (
            <div>
                <input value={newTodoItem} onChange={(e) => setNewItem(e.target.value)} required></input>
                <button id="cancel-item" class="pure-button"  onClick={cancelItem}>Cancel</button>
                <button id="add-item" class="pure-button" onClick={addTodoItem}>Add Todo Item</button>
            </div>  
        )}    
        <div>
            <h1>Tasks</h1>
        </div>
        <div>
            <ul> {listTodoItems}</ul>
        </div>
        <div>
        <button class="pure-button"> <Link href="done/">Take me to my done items</Link></button>
    </div>
    </div>
    </>
}