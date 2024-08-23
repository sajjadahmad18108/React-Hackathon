import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import './Progress.css';
import { db } from '../../../Firebase/Firebase'; // Import your Firebase configuration
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'; // Import Firestore functions

export const Progress = () => {
    const [showInput, setShowInput] = useState(false);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Querying the 'Progress' collection, ordering by 'timestamp' field
        const q = query(collection(db, 'Progress'), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log("Fetched tasks: ", tasksArray); // Log the fetched tasks
            setTasks(tasksArray);
        });

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
                // Adding a new document to the 'Progress' collection
                const docRef = await addDoc(collection(db, "Progress"), {
                    task: task,
                    timestamp: new Date(),
                    status: 'Progress'
                });

                console.log("Document written with ID: ", docRef.id);
                setTasks([{ id: docRef.id, task: task, status: 'Progress' }, ...tasks]);
                setTask('');
                setShowInput(false);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    return (
        <div className='progress'>
            <h3>In Progress</h3>
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
