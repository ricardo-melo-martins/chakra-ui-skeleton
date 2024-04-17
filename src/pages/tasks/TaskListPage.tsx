import { useState, useEffect } from 'react';
import HttpClient from '../../config/api/httpClient';
import { VStack, HStack, Text, IconButton, useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Box, InputGroup, InputRightElement, Select, Textarea, Divider } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

type TaskItem = {
    id: number | null
    name: string
    description: string
    delivery_date: string
    status: number
    finished_at: string
}

const taskItem: TaskItem = {
    id: null,
    name: '',
    description: '',
    status: 1,
    delivery_date: '',
    finished_at: ''
}

function TaskListPage() {
  
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [task, setTask] = useState<TaskItem>(taskItem);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await HttpClient.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        
        toast({
            title: 'Erro em buscar.',
            description: "Não foi possível buscar a lista de tarefas.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId: number | null) => {
    try {
      await HttpClient.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task: TaskItem) => task.id !== taskId));
    } catch (error) {
      console.error('deleteTask : error:', error);
      toast({
            title: 'Erro ao tentar apagar este registro.',
            description: "Não foi possível apagar registro da lista de tarefas.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
  };

  const openEditModal = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const saveEditedTask = async (editedTask: TaskItem) => {
    try {

      await HttpClient.put(`/tasks/${editedTask.id}`, editedTask);

     // setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
      closeEditModal();

    } catch (error) {
      console.error('saveEditedTask error:', error);
        toast({
            title: 'Erro ao tentar atualizar.',
            description: "Não foi possível atualizar este registro da lista de tarefas.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Box>
        <VStack spacing={4}>
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
                   <Button onClick={() => openEditModal(task)}>Edit</Button>
              </HStack>
          ))}
      </VStack>

      <Modal isOpen={isModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar tarefa "{editingTask?.name}"</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Divider />

            <FormControl isRequired>
              <FormLabel htmlFor='name'>Nome da Tarefa</FormLabel>
              <Input
                id='name'
                name='name'
                placeholder='Digite o nome da tarefa'
                defaultValue={editingTask?.name}
                value={task.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor='description'>Descrição</FormLabel>
              <Textarea
                id='description'
                name='description'
                placeholder='Descreva a tarefa'
                defaultValue={editingTask?.description}
                value={editingTask?.description}
                onChange={handleChange}
              />
            </FormControl>


            <FormControl id="dataHora">
                <FormLabel>Data e Hora</FormLabel>
                <InputGroup>
                    <Input
                        type="datetime-local"
                        placeholder="Selecione a data e hora"
                        name="dataHora"
                    />
                    <InputRightElement>
                        
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor='status'>Status</FormLabel>
              <Select
                id='status'
                name='status'
                value={task.status}
                onChange={handleChange}
              >
                <option value='-1'>Não Atribuído</option>
                <option value='1'>Pendente</option>
                <option value='2'>Em Andamento</option>
                <option value='3'>Concluído</option>
              </Select>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => saveEditedTask(editingTask!)}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={closeEditModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TaskListPage