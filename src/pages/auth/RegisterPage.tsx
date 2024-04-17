import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import HttpClient from '../../config/api/httpClient'

type RegisterFormData = {
  nome: string
  email: string
  senha: string
  senhaConfirma: string
}

type RegisterApiData = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

function RegisterPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<RegisterFormData>()

  const { isOpen, onToggle } = useDisclosure()

  const toast = useToast()

  const onRegister = async (data: RegisterFormData) => {
    try {
      const response = await HttpClient.post('/auth/register', data)
      console.log('RegisterPage: response:', response.data)

      toast({
        title: 'Cadastro realizado.',
        description: 'Nós recebemos seus dados de cadastro.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      // return redirect("/login");
    } catch (error) {
      console.error('RegisterPage: Error:', error)
      toast({
        title: 'Erro no cadastro.',
        description: 'Não foi possível enviar seus dados.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box w="300px" maxW="md" mx="auto" p={4}>
        <form onSubmit={handleSubmit(onRegister)}>
          <Stack spacing={4}>
            <FormControl id="nome" isRequired>
              <FormLabel htmlFor="nome">Nome</FormLabel>
              <Input
                type="text"
                placeholder="Seu nome"
                {...register('nome', { required: true })}
              />
              {errors.nome && (
                <span style={{ color: 'red' }}>Campo obrigatório</span>
              )}
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                placeholder="Seu email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>Email inválido</span>
              )}
            </FormControl>

            <FormControl id="senha" isRequired mt={4}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  type={isOpen ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  {...register('senha', { required: true, minLength: 6 })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={onToggle}>
                    {isOpen ? 'Esconder' : 'Mostrar'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.senha && (
                <span style={{ color: 'red' }}>
                  Senha deve ter pelo menos 6 caracteres
                </span>
              )}
            </FormControl>

            <FormControl id="confirmaSenha" isRequired>
              <FormLabel>Confirmação de Senha</FormLabel>
              <Input
                type="password"
                placeholder="Confirme sua senha"
                {...register('senhaConfirma', {
                  required: true
                  // validate: (value) => value === document.querySelector('input[name="senha"]').value,
                })}
              />
              {errors.senhaConfirma && (
                <span style={{ color: 'red' }}>Senhas não coincidem</span>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="pink"
              mt={4}
              w="100%"
              isLoading={isSubmitting}
            >
              Registre-me agora!
            </Button>

            {/*
                   TODO: colocar aqui erros retornados da api
                   {error && (
                    <FormHelperText color="red.500" mt={2}>
                        {error}
                    </FormHelperText>
                )} */}
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}

export default RegisterPage
