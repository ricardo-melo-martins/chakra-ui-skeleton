import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
  useToast
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { HttpClient, history } from '../../boot'
import sleep from '../../common/types/utils/Sleep'
import { FaRegUser } from 'react-icons/fa'

interface RegisterFormData {
  nome: string
  email: string
  senha: string
  senhaConfirma: string
}

interface RegisterApiData {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

function exchangeData(formData: RegisterFormData): RegisterApiData {
  const nome = formData.nome.trim().split(' ')
  const first_name = nome[0]
  const last_name = nome[nome?.length - 1]
  const username = formData.email.trim().split('@')[0]

  const registerApiData: RegisterApiData = {
    email: formData.email,
    username: username,
    first_name: first_name,
    last_name: last_name,
    password: formData.senha,
    password_confirmation: formData.senhaConfirma
  }
  return registerApiData
}

function RegisterPage() {
  const [isFitScreen] = useMediaQuery('(max-width: 600px')

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<RegisterFormData>()

  const { isOpen, onToggle } = useDisclosure()

  const toast = useToast()

  const onRegister = async (data: RegisterFormData) => {
    try {
      const dataApi = exchangeData(data)
      const response = await HttpClient.post('/auth/register', dataApi)

      if (response.status !== 201) {
        console.log(response.data)
      }
      toast({
        title: 'Cadastro realizado.',
        description:
          'Nós recebemos seus dados de cadastro. Aguarde você será redirecionado',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      sleep(9000).then(() => {
        history.navigate('/public/login')
      })
    } catch (error: any) {
      console.error('RegisterPage: Error:', JSON.parse(JSON.stringify(error)))
      const message =
        error && typeof error != 'undefined' && error.hasOwnProperty('message')
          ? JSON.parse(JSON.stringify(error.message))
          : 'Não foi possível enviar seus dados.'

      toast({
        title: 'Erro no cadastro.',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Flex
      height="100vh"
      p={12}
      width={isFitScreen ? '60%' : '100%'}
      direction="column"
      justifyContent={isFitScreen ? 'center' : 'space-between'}
      alignItems="center"
      textAlign="center"
    >
      <Box w="600px" maxW="md" mx="auto" p={4}>
        <VStack align="start" spacing={4} mb={10}>
          <Heading size="lg" display="flex" alignItems="center">
            <Icon as={FaRegUser} mr={2} /> {/* Ícone dinâmico */}
            {'Registrar'}
          </Heading>

          <Text>Registre suas credenciais de acesso.</Text>
        </VStack>

        <form onSubmit={handleSubmit(onRegister)}>
          <Stack spacing={4}>
            <FormControl id="nome" isRequired>
              <FormLabel htmlFor="nome">Nome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome completo"
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
