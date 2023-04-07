import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useUser} from "@clerk/nextjs";
import { useRouter } from 'next/router';

export default function Todos() {
    const [todoList, setTodoList] = useState([]);
    const [newTodoItem, setNewItem] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [iconVisible, setIconVisible] = useState(true);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
        router.replace("/");
        }
    }, [user]);

    const listTodoItems = todoList.map((item, index) => 
        <li key={index}>
            <input type="checkbox" id={`item${index}`} />
            {item}
        </li>
    )
    
    function addTodoItem(){
        setTodoList(todoList.concat(newTodoItem));
        setNewItem("");
        setInputVisible(false);
        setIconVisible(true);
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
    </div>
    </>
}