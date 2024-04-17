/* TODO: 
- interceptor axios
- deleteTask modal confirmação
- deleteTask message apagado
- deleteTask message api error
- list finished status
*/
import {
  VStack,
  HStack,
  Text,
  IconButton
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

type TaskItem = {
    id: number
    name: string
    description: string
    delivery_date: string
    finished_at: string
}

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTMzMjgxMzIsImV4cCI6MTcxMzMzMTczMiwibmJmIjoxNzEzMzI4MTMyLCJqdGkiOiJzNWtiZDgzVXNoYnFwdVpsIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.biLRSvWJVxfhfRldezPCUlo3NziLu9OJwT6VlBRNXmg';
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('fetchTask : error :', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task: TaskItem) => task.id !== taskId));
    } catch (error) {
      console.error('deleteTask : error:', error);
    }
  };

  return (
    <><VStack spacing={4}>
          {tasks.map((task: TaskItem) => (
              <HStack key={task.id} w="full" justify="space-between" p={4} boxShadow="md" borderRadius="md">
                  <VStack align="start">
                      <Text fontWeight="bold">{task.name}</Text>
                      <Text>{task.description}</Text>
                  </VStack>
                  <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      onClick={() => deleteTask(task.id)} />
              </HStack>
          ))}
      </VStack>
      {/* <Box>
              {tasks.map((task: TaskItem) => (
                  <Box key={task.id}>
                      <div>Nome: {task.name}</div>
                      <div>Descrição: {task.description}</div>
                      <div>Status: {task.finished_at}</div>
                  </Box>
              ))}
          </Box> */}
       </>
  );
}

export default TaskListPage