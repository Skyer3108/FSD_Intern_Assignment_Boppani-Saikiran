import { useState, useEffect } from "react"
import './task.css'
import axios from "axios"


const Task = ({ user,handelLogOut }) => {

    const [tasks, setTask] = useState([])

    const [search, setSearch] = useState('')

    const [newTask, setNewTask] = useState({ title: '', desc: '', priority: 'Low' })

    const [filterStatus,setFilterStatus]=useState('All')


    const filterTask=tasks.filter((val)=>{


        const serMatch= val.title.toLowerCase().includes(search.toLowerCase())

        if(filterStatus==='Completed'){

            return serMatch&&val.status==='Completed'
        }
        else if(filterStatus==='Pending'){
            return serMatch&&val.status==='Pending'
        }
        else{
            return serMatch
        }


    })

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const response = await axios.get('http://localhost:5000/api/get-task', {
                    headers: { id: user.id, token: user.token }
                })

                console.log(response.data.data)
                setTask(response.data.data)

            } catch (err) {

                console.log(err)

            }

        }

        fetchTasks()

    }, [user])

    const addTask = async () => {

        try {
            if (newTask.title.trim() !== '' && newTask.desc.trim() !== '') {

                const response = await axios.post('http://localhost:5000/api/add-task', newTask, {
                    headers: { id: user.id, token: user.token }
                })

                setTask([...tasks, response.data.data])

                setNewTask({ title: '', desc: '', priority: 'Low' })

            }


        }
        catch (err) {

            console.log(err)

        }
    }

    const updateTaskStatus = async (taskId, status) => {
        try {

            const response = await axios.put(`http://localhost:5000/api/update-task/${taskId}`, { status })
            setTask(tasks.map(task => task._id === taskId ? response.data.task : task))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="task-container">

            <div className="add-task">
                <h4>Add New Task</h4>

              <lable for='title'>Title : </lable> 
                <input id='title'
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
               
               <lable for='title'>Description : </lable> 
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.desc}
                    onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
                />
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={addTask}>Add Task</button>

                <button onClick={handelLogOut}>Logout</button>
            </div>





            <h3>Your Tasks</h3>

            <div>

                <input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} />
                
            </div>

            <div>
                <button onClick={()=>setFilterStatus('All')}>All</button>
                <button onClick={()=>setFilterStatus('Completed')}>Completed</button>
                <button onClick={()=>setFilterStatus('Pending')}>Pending</button>

            </div>


            <ul>
                {filterTask?filterTask.map(task => (
                    <li key={task._id}>
                        <h4>{task.title}</h4>
                        <p>{task.desc}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => updateTaskStatus(task._id, 'Completed')}>Mark Completed</button>
                    </li>
                )):<>
                   <p>There are No Tasks</p>
                </>}
            </ul>



        </div>
    )
}

export default Task