import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Done() {
    const [todoList, setTodoList] = useState([]);
    const { user } = useUser();
    const { getToken } = useAuth();
    const router = useRouter();

    const API_ENDPOINT = 'https://backend-w2cd.api.codehooks.io/dev/done';
    const API_ENDPOINT_COMPLETED = 'https://backend-w2cd.api.codehooks.io/dev/todos';
    const API_ENDPOINT_GET = 'https://backend-w2cd.api.codehooks.io/dev/done?userId=';

    useEffect(() => {
        if (!user) {
        router.replace("/");
        } else {
            fetchTodos();
        }
    }, [user]);

    async function fetchTodos() {
        const authToken = await getToken({ template: "codehooks" });
        try {
        const response = await fetch(API_ENDPOINT_GET+user.id, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + authToken}
            });
          const todos = await response.json();
          console.log(todos)
          setTodoList(todos);
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
    }

    const listTodoItems = todoList.map((item, index) => 
        <li key={index}>
            <input type="checkbox"
             id={`item${index}`} 
              checked={item.completed}
             onChange={() => updateCompletion(item._id, !item.completed)}
             />
            {item.description}
        </li>
    )

    async function updateCompletion(id, completed) {
        console.log("this is id: " + id);
        console.log("this is completed: " + JSON.stringify({completed}));
        const authToken = await getToken({ template: "codehooks" });
        try {
            const response = await fetch(`${API_ENDPOINT_COMPLETED}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({ completed }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
    
            const updatedTodo = await response.json();
            console.log("this is updatedTodo: " + JSON.stringify(updatedTodo))
    
            if (!completed) {
                // Remove the unchecked item from the list
                setTodoList(todoList.filter((todo) => todo._id !== updatedTodo._id));
            }
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    }

    return <>
    <div id="todos-container">
            <h1>Done Tasks</h1>
        <div>
            <ul> {listTodoItems}</ul>
        </div>
        <button class="pure-button"> <Link href="todos/">Take me to my to-do list</Link></button>
    </div>
    </>
}