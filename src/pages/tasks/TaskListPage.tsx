import { useState, useEffect } from 'react'
import HttpClient from '../../config/api/httpClient'
import {
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Box,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
  Divider,
  Heading,
  Icon,
  Flex,
  Center,
  Square,
  Spacer,
  ButtonGroup,
  Badge
} from '@chakra-ui/react'
import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { FaCog } from 'react-icons/fa'

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
  const toast = useToast()

  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [task, setTask] = useState<TaskItem>(taskItem)
  const [editingTask, setCreateOrEditingTask] = useState<TaskItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState<boolean>(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await HttpClient.get('/tasks')
        setTasks(response.data)
      } catch (error) {
        toast({
          title: 'Erro em buscar.',
          description: 'Não foi possível buscar a lista de tarefas.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }

    fetchTasks()
  }, [])

  const deleteTask = async (taskId: number | null) => {
    try {
      await HttpClient.delete(`/tasks/${taskId}`)
      setTasks(tasks.filter((task: TaskItem) => task.id !== taskId))
    } catch (error) {
      console.error('deleteTask : error:', error)
      toast({
        title: 'Erro ao tentar apagar este registro.',
        description: 'Não foi possível apagar registro da lista de tarefas.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const openEditModal = (task: any) => {
    setCreateOrEditingTask(task)
    setIsModalOpen(true)
    setIsCreate(false)
  }

  const openCreateModal = () => {
    setCreateOrEditingTask(taskItem)
    setIsModalOpen(true)
    setIsCreate(true)
  }

  const closeEditModal = () => {
    setCreateOrEditingTask(null)
    setIsModalOpen(false)
  }

  const saveEditedTask = async (editedTask: TaskItem) => {
    try {
      await HttpClient.put(`/tasks/${editedTask.id}`, editedTask)

      // setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
      closeEditModal()
    } catch (error) {
      console.error('saveEditedTask error:', error)
      toast({
        title: 'Erro ao tentar atualizar.',
        description:
          'Não foi possível atualizar este registro da lista de tarefas.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setTask((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Flex align="center" justify="center">
      <Box w="600px">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Icon as={FaCog} mr={0} />
            <VStack align="start">
              <Heading size="lg">Tarefas</Heading>
              <Text>Lista de tarefas</Text>
            </VStack>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button
              onClick={() => openCreateModal()}
              leftIcon={<PlusSquareIcon />}
              colorScheme="pink"
              variant="solid"
            >
              Criar tarefa
            </Button>
          </ButtonGroup>
        </Flex>

        <Divider />

        <VStack spacing={4}>
          {tasks.map((task: TaskItem) => (
            <HStack
              key={task.id}
              w="full"
              justify="space-between"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              <VStack align="start">
                <Text fontWeight="bold">{task.name}</Text>
                <Text>{task.description}</Text>
              </VStack>
              <HStack>
                <Button
                  aria-label="Alterar tarefa"
                  onClick={() => openEditModal(task)}
                >
                  Edit
                </Button>
                <IconButton
                  aria-label="Remover tarefa"
                  color={'red'}
                  icon={<DeleteIcon />}
                  onClick={() => deleteTask(task.id)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>

        <Modal isOpen={isModalOpen} onClose={closeEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontWeight="bold">
                {isCreate
                  ? 'Criar'
                  : 'Alterar tarefa "' + editingTask?.name + '"'}{' '}
              </Text>{' '}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider mb={5} />

              <FormControl isRequired mb={5}>
                <FormLabel htmlFor="name">Nome da Tarefa</FormLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Digite o nome da tarefa"
                  defaultValue={editingTask?.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired mb={5}>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descreva a tarefa"
                  defaultValue={editingTask?.description}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="dataHora" mb={5}>
                <FormLabel>Data e Hora</FormLabel>
                <InputGroup>
                  <Input
                    type="datetime-local"
                    placeholder="Selecione a data e hora"
                    name="dataHora"
                    defaultValue={editingTask?.delivery_date}
                  />
                  <InputRightElement></InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired mb={5}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  id="status"
                  name="status"
                  defaultValue={editingTask?.status}
                  onChange={handleChange}
                >
                  <option value="-1">Não Atribuído</option>
                  <option value="1">Pendente</option>
                  <option value="2">Em Andamento</option>
                  <option value="3">Concluído</option>
                </Select>
              </FormControl>
              <Divider />
            </ModalBody>
            <ModalFooter>
              <HStack justify="space-between">
                <Button
                  colorScheme="pink"
                  onClick={() => saveEditedTask(editingTask!)}
                >
                  Salvar
                </Button>
                <Button variant="ghost" onClick={closeEditModal}>
                  Cancelar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  )
}

export default TaskListPage
