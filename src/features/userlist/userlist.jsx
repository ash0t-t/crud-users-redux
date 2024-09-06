import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './userlist.module.css';
import { fetchUsers, createUser, modifyUser, removeUserThunk } from "./userlist.slice";

export const UserList = () => {
  const users = useSelector((state) => state.users);
  const loader = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({ name: '', age: '', salary: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    dispatch(createUser(newUser));
    setNewUser({ name: '', age: '', salary: '' });
  };

  const handleUpdateUser = () => {
    dispatch(modifyUser(editingUser));
    setEditingUser(null);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (id) => {
    dispatch(removeUserThunk(id));
  };

  return (
    <>
      <h3>Users ({users.length})</h3>
      {loader && <img width="100px" src="https://i.gifer.com/ZKZg.gif" alt="Loading" />}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Salary</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.salary}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>{editingUser ? 'Edit User' : 'Add New User'}</h4>
        <input
          type="text"
          placeholder="Name"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) => editingUser
            ? setEditingUser({ ...editingUser, name: e.target.value })
            : setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={editingUser ? editingUser.age : newUser.age}
          onChange={(e) => editingUser
            ? setEditingUser({ ...editingUser, age: e.target.value })
            : setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={editingUser ? editingUser.salary : newUser.salary}
          onChange={(e) => editingUser
            ? setEditingUser({ ...editingUser, salary: e.target.value })
            : setNewUser({ ...newUser, salary: e.target.value })}
        />
        <button onClick={editingUser ? handleUpdateUser : handleCreateUser}>
          {editingUser ? 'Update' : 'Create'}
        </button>
      </div>
    </>
  );
};