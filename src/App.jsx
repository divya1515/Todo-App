import { useState, useEffect } from 'react'
import { TodoProvider } from './Context'
import Todoform from './Components/Todoform'
import TodoItem from './Components/TodoItem'

function App() {
  const [todos, settodos] = useState([])
  const addtodo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  const updatedtodo = (id, todo) => {
    settodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }

  const deletetodo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id != id))
  }
  const toggleComplete = (id) => {
    settodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo)))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <>
      <TodoProvider value={{ todos, addtodo, updatedtodo, deletetodo, toggleComplete }}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <Todoform />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id}
                  className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
