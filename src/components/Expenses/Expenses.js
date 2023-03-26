import React from 'react'
import classes from './Expenses.module.css';
import Card from '../UI/Card'
import ExpensesList from './ExpensesList';
import NumberOfExpenses from './NumberOfExpenses';

const Expenses = () => {
  return (
    <Card className={classes.card}>
        <ExpensesList />
    </Card>
  )
}

export default Expenses