import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import './Todo.css';
import { db } from '../../../Firebase/Firebase'; // Import your Firebase configuration
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'; // Import Firestore functions

export const Todo = () => {
    const [showInput, setShowInput] = useState(false);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Create a query to fetch tasks from the "Todo" collection ordered by createdAt
        const q = query(collection(db, 'Todo'), orderBy('timestamp', 'desc'));

        // Listen for real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksArray);
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (task.trim()) {
            try {
                // Add a new document to the "Todo" collection
                const docRef = await addDoc(collection(db, "Todo"), {
                    task: task,
                    timestamp: new Date(),
                    status: 'todo'
                });
                console.log("Document written with ID: ", docRef.id);

                // No need to manually update tasks state here
                setTask('');
                setShowInput(false);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    return (
        <div className='todo'>
            <h3>Todo</h3>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Button
                    sx={{
                        textAlign: 'center',
                        borderColor: 'blue',
                        width: '100%',
                        padding: '2px 7px',
                        color: 'blue',
                        '&:hover': {
                            borderColor: 'lightblue',
                            backgroundColor: 'lightblue',
                        },
                    }}
                    onClick={handleClick}
                    variant="outlined"
                    startIcon={<AddIcon sx={{ color: 'blue', fontSize: '1.5rem' }} />}>
                    Add Task
                </Button>
            </Stack>
            {showInput && (
                <form onSubmit={handleSubmit} className='taskForm'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter your task"
                        value={task}
                        onChange={handleInputChange}
                        sx={{ width: '100%' }}
                    />
                </form>
            )}

            <div className="taskList">
                {tasks.map((taskItem) => (
                    <div key={taskItem.id} className="taskItem">
                        {taskItem.task}
                    </div>
                ))}
            </div>
        </div>
    );
}
