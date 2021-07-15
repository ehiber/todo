import React, { useState, useEffect } from "react";
import ListInput from "../component/ListInput";
import ListItem from "../component/ListItem";

const ToDoList = props => {
	const [newTask, setNewTask] = useState("");
	const [working, setWorking] = useState(true);
	const [tasks, setTasks] = useState([]);

	// working mount effect
	useEffect(
		() => {
			// effects
			if (working) {
				setWorking(false);
			}
			return () => {
				// cleanup
			};
		},
		[working]
	);
	const handleAddTask = e => {
		e.preventDefault();
		setWorking(true);
		if (newTask.trim().length < 5) {
			alert("sorry, can't create such short tasks!");
		} else {
			let newTasks = [
				...tasks,
				{
					label: newTask,
					done: false
				}
			];
			setTasks(newTasks);
		}
		setNewTask("");
		setWorking(false);
	};

	const handleInputChange = e => {
		setNewTask(e.target.value);
	};

	const disableInput = () => {
		if (!tasks.length > 0 || working) {
			return true;
		} else {
			return false;
		}
	};

	const handleDeleteTask = async (e, idToDelete) => {
		setWorking(true);
		let tasksLeft = tasks.filter((task, index) => index != idToDelete);

		setTasks(tasksLeft);
	};
	return (
		<div className="container d-flex flex-column">
			<header className="todo-header text-center mb-3">
				<h1 className="display-3">Mi lista de tareas</h1>
			</header>
			<section className="todo-body">
				<ListInput
					onChangeHandler={handleInputChange}
					onSubmitHandler={handleAddTask}
					value={newTask}
					disableInput={disableInput()}
					storeIsReady={!working}
				/>
				<ul className="main-list mx-auto">
					{tasks.map((task, index) => {
						return (
							<ListItem key={index} label={task.label} onClickHandler={e => handleDeleteTask(e, index)} />
						);
					})}
				</ul>
				<footer className="list-footer mx-auto mt-5">
					<p>
						{tasks.length > 1
							? `Faltan ${tasks.length} tareas por hacer...`
							: tasks.length == 1
								? `Falta ${tasks.length} sola tarea por hacer!`
								: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
					</p>
				</footer>
			</section>
			<button
				onClick={async () => {
					setWorking(true);
					setTasks([{ label: "Estudiar React", done: false }]);
					setWorking(false);
				}}
				className={
					tasks.length > 0 || working
						? "btn btn-success my-2 mx-auto w-50 disabled"
						: "btn btn-success my-2 mx-auto w-50"
				}
				disabled={tasks.length > 0 || working}>
				Crear usuario
			</button>
			{/* <button
				onClick={async () => {
					setWorking(true);
					await actions.fetchDeleteUser();
					setWorking(false);
				}}
				disabled={!store.tasks.length > 0 || working}
				className={
					store.tasks.length > 0 && !working
						? "btn btn-danger mt-4 mx-auto w-50"
						: "btn btn-danger mt-4 mx-auto w-50 disabled"
				}>
				Borrar tareas y usuario
			</button>
			<button
				onClick={async () => {
					setWorking(true);
					await actions.fetchCreateUser();
					setWorking(false);
				}}
				className={
					store.tasks.length > 0 || working
						? "btn btn-success my-2 mx-auto w-50 disabled"
						: "btn btn-success my-2 mx-auto w-50"
				}
				disabled={store.tasks.length > 0 || working}>
				Crear usuario
			</button> */}
		</div>
	);
};

export default ToDoList;
