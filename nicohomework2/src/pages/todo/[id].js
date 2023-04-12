import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Id() {
    const [todoItem, setTodoItem] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const { id } = router.query;

    const API_ENDPOINT = 'https://backend-w2cd.api.codehooks.io/dev/todo/';
    const API_ENDPOINT_COMPLETED = 'https://backend-w2cd.api.codehooks.io/dev/todos';
    const API_KEY = "bb830a11-6df4-4ad7-a7cb-ad384a7f8144"

    useEffect(() => {
        if (!user) {
        router.replace("/");
        } else {
            fetchTodos();
        }
    }, [user]);

    function handleDescriptionChange(e) {
        setTodoItem({ ...todoItem, description: e.target.value });
    }

    function cancelEdit() {
        setIsEditing(false);
    }

    async function fetchTodos() {
        try {
        const response = await fetch(API_ENDPOINT+id, {
            method: 'GET',
            headers: {
                'x-apikey': API_KEY,
                // Add any other headers you need here
            },
            });
          const todo = await response.json();
          console.log(todo)
          setTodoItem(todo);
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
    }

    async function updateItemCompletion(id, completed) {
        console.log("this is id: " + id);
        console.log("this is completed: " + JSON.stringify({completed}));
        try {
            const response = await fetch(`${API_ENDPOINT_COMPLETED}/${id}`, {
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
    
            // // Update the todo list with the updated todo item
            // setTodoList(todoList.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    }

    async function updateDescription() {
        try {
          const response = await fetch(API_ENDPOINT+id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': API_KEY,
            },
            body: JSON.stringify({ description: todoItem.description }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update todo description');
          }
    
          const updatedTodo = await response.json();
          console.log("this is updatedTodo: " + JSON.stringify(updatedTodo));

          setTodoItem(updatedTodo);
          setIsEditing(false);
    
        } catch (error) {
          console.error('Failed to update todo description:', error);
        }
    }

    async function deleteTodoItem(itemId) {
        try {
          const response = await fetch(`${API_ENDPOINT}${itemId}`, {
            method: 'DELETE',
            headers: {
              'x-apikey': API_KEY,
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete todo item');
          }
      
          const deletedTodo = await response.json();
          console.log('Deleted todo item:', deletedTodo);
      
          // Redirect back to the todos list
          router.push('/todos');
        } catch (error) {
          console.error('Failed to delete todo item:', error);
        }
      }

    return <>
    {todoItem && (
      <div id="todo-container">
        <div id="check-item">
            <input
            type="checkbox"
            id={`item-${todoItem._id}`}
            onChange={() => updateItemCompletion(todoItem._id, !todoItem.completed)}
            />
           {isEditing ? (
            <>
              <input
                type="text"
                value={todoItem.description}
                onChange={handleDescriptionChange}
              />
               <button id="update-item" className="pure-button" onClick={updateDescription}>Update Todo Item</button>
               <button id="cancel-update" className="pure-button" onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              todoItem.description
            )}
            <span class="icon"  onClick={() => setIsEditing(!isEditing)}>
                <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </span>
            <span class="icon" onClick={() => deleteTodoItem(todoItem._id)}>
                <FontAwesomeIcon icon={faTrash} size="lg"/>
            </span>
        </div>
        <div>
            <button className="pure-button"><Link href="/todos">Take me to my to-do list</Link></button>
        </div>
      </div>
    )}
    </>
}