/* TODO: 
- deleteTask modal confirmação
- deleteTask message apagado
- deleteTask message api error
- list finished status
*/
import { useState, useEffect } from 'react';
import HttpClient from '../../config/api/httpClient';
import { VStack, HStack, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

type TaskItem = {
    id: number
    name: string
    description: string
    delivery_date: string
    finished_at: string
}

function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await HttpClient.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('fetchTask : error :', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId: number) => {
    try {
      await HttpClient.delete(`/tasks/${taskId}`);
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