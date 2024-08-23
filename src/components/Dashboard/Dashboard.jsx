import React from 'react'

import { Progress } from './Progress/Progress'
import { Done } from './Done/Done'
import {Todo} from './Todo/Todo'
import './Dashboard.css'


function Dashboard() {
  return (
    <div className='main_container'>
     <Todo />

     <Progress />
     <Done />
    </div>
  )
}

export default Dashboard
