import { useState } from 'react'

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'

type TaskCreateApiData = {
  name: string
  description: string
  delivery_date: string
  status: string
}

function TaskEditPage() {
  const [task, setTask] = useState({
    name: '',
    description: '',
    status: 'pendente'
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setTask((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    console.log(task)
  }

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome da Tarefa</FormLabel>
            <Input
              id="name"
              name="name"
              placeholder="Digite o nome da tarefa"
              value={task.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Descreva a tarefa"
              value={task.description}
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
              <InputRightElement></InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </Select>
          </FormControl>

          <Button colorScheme="pink" type="submit" mt={4}>
            Cadastrar Tarefa
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default TaskEditPage
