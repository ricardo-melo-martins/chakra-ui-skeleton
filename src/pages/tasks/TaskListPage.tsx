import { useState } from 'react'

import {
  VStack,
  HStack,
  Text,
  IconButton,
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
  Spacer,
  ButtonGroup,
  useToast
} from '@chakra-ui/react'
import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { FaRegListAlt } from 'react-icons/fa'
import { Task, taskItem, useTask } from './TaskContext'

function TaskListPage() {
  const {
    task,
    tasks,
    handleChange,
    addTask,
    updateTask,
    removeTask,
    loading,
    setCurrentTask
  } = useTask()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const [editingTask, setCreateOrEditingTask] = useState<Task | null>(null)
  const toast = useToast()

  const handleOpenModalCreateOrSave = (taskCreateOrEdit: Task) => {
    setCurrentTask(taskCreateOrEdit)
    if (taskCreateOrEdit.id === null) {
      setIsCreate(true)
      setCreateOrEditingTask(editingTask)
    } else {
      setIsCreate(false)
      setCreateOrEditingTask(taskCreateOrEdit)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCreateOrEditingTask(null)
    setIsModalOpen(false)
  }

  const handleUpdate = (taskUpdate: Task | null) => {
    if (taskUpdate) setCurrentTask(taskUpdate)
    updateTask(task)
  }

  const handleCreate = (taskCreate: Task | null) => {
    if (taskCreate) setCurrentTask(taskCreate)
    addTask(task)
  }

  const handleDelete = (taskId: number | null) => {
    if (taskId) removeTask(taskId)
  }

  const handleInlineStatusChange = (e: {
    target: { name: any; value: any }
  }) => {
    const { name, value } = e.target

    if (name === 'statusInline') {
      toastExemplo()
      task.status = value
      setCurrentTask(task)
      updateTask(task)
    }
  }

  // TODO: aplicar toasts nas chamadas
  const toastExemplo = () => {
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(200), 3000)
    })

    toast.promise(examplePromise, {
      success: {
        title: 'Alteração concluída',
        description: 'Situação da tarefa foi alterada'
      },
      error: { title: 'Erro', description: 'Algo deu errado' },
      loading: { title: 'Aguarde...', description: 'Por favor aguarde' }
    })
  }

  if (loading) {
    // TODO: Incluir no BehaviorSubject rjxs Interceptado pelo axios
    return <p>Carregando...</p>
  }

  return (
    <Flex align="center" justify="center">
      <Box w="600px">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box mt="5">
            <VStack align="start" spacing={4} mb={10}>
              <Heading size="lg" display="flex" alignItems="center">
                <Icon as={FaRegListAlt} mr={2} /> {/* Ícone dinâmico */}
                {'Tarefas'}
              </Heading>
              <Text>Lista de tarefas registradas por você.</Text>
            </VStack>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button
              onClick={() => handleOpenModalCreateOrSave(taskItem)}
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
          {tasks.map((task: Task) => (
            <HStack
              key={task.id}
              w="full"
              justify="space-between"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              <VStack align="start" spacing={4} mb={10}>
                <Text fontWeight="bold">{task.name}</Text>
                <Text>{task.description}</Text>
              </VStack>
              <HStack>
                <VStack align="start" spacing={4} mb={10}>
                  <Box display="flex" alignItems="right">
                    <Button
                      size="sm"
                      marginRight={2}
                      aria-label="Alterar tarefa"
                      onClick={() => handleOpenModalCreateOrSave(task)}
                    >
                      Edit
                    </Button>
                    <IconButton
                      size="sm"
                      aria-label="Remover tarefa"
                      color={'red'}
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(task.id)}
                    />
                  </Box>
                  <Select
                    id="statusInline"
                    name="statusInline"
                    defaultValue={task?.status}
                    onChange={handleInlineStatusChange}
                  >
                    <option value="indefinido">Não Atribuído</option>
                    <option value="pendente">Pendente</option>
                    <option value="andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                  </Select>
                </VStack>
              </HStack>
            </HStack>
          ))}
        </VStack>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontWeight="bold">
                {isCreate
                  ? 'Criar'
                  : 'Alterar tarefa "' + editingTask?.name + '"'}
              </Text>{' '}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider mb={5} />

              <form>
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

                <FormControl id="delivery_date" mb={5}>
                  <FormLabel>Data e Hora</FormLabel>
                  <InputGroup>
                    <Input
                      type="datetime-local"
                      placeholder="Selecione a data e hora"
                      name="delivery_date"
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
                    <option value="indefinido">Não Atribuído</option>
                    <option value="pendente">Pendente</option>
                    <option value="andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                  </Select>
                </FormControl>
              </form>
              <Divider />
            </ModalBody>
            <ModalFooter>
              <HStack justify="space-between">
                <Button
                  colorScheme="pink"
                  onClick={
                    isCreate
                      ? () => handleCreate(editingTask)
                      : () => handleUpdate(editingTask)
                  }
                >
                  Salvar
                </Button>
                <Button variant="ghost" onClick={handleCloseModal}>
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
