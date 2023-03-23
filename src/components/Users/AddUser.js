import React, {Fragment, useState} from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = props =>{
    const[enteredUserName, setEnteredUserName] = useState('');
    const[enteredUserAge, setEnteredUserAge] = useState('');
    const[error, setError] = useState();

    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredUserAge.trim().length === 0){
            setError({
                title: "Invalid Input",
                message: "Please enter a valid name and age (non empty values are allowed !)"
            });
            return;
        }

        if(+enteredUserAge < 1){
            setError({
                title: "Invalid Input",
                message: "Please enter a valid age (non negative values are allowed !)"
            });
            return;  
        } 

        props.onAddUser(enteredUserName, enteredUserAge);
        setEnteredUserName('');
        setEnteredUserAge('');
    };

    const usernameChangeHandler = (event) =>{
        setEnteredUserName(event.target.value);
    };

    const ageChangeHandler = (event) =>{
        setEnteredUserAge(event.target.value);
    };

    const errorHandlder = () =>{
        setError(null);
    };
    
    return(
        <Fragment>
            {error && 
                (<ErrorModal title={error.title} 
                             message={error.message} 
                             onConfirm={errorHandlder}/>)}
                <Card className={styles.input}>
                    <form onSubmit={addUserHandler}>
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username"
                            type="text" 
                            onChange={usernameChangeHandler}
                            value={enteredUserName}/>
                        <label htmlFor="age">Age (Years)</label>
                        <input 
                            id="age"
                            type="number"
                            onChange={ageChangeHandler}
                            value={enteredUserAge}/>
                        <Button type="submit">Add User</Button>
                    </form>
                </Card>
        </Fragment>
    );
}

export default AddUser;