import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  Flex,
  Stack,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
  useMediaQuery
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import HttpClient from '../../config/api/httpClient'
import { history } from '../../boot/history'
import { useContext } from 'react'
import { AuthContext } from '../../config/context/AuthContext'
import Props from '../../common/types/Props'

interface LoginType {
  email: string
  password: string
}

const LoginItem: LoginType = {
  email: 'ricardo-melo-martins@users.noreply.github.com',
  password: 'YourP@ssw0rd!'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = (props: Props) => {
  const [isFitScreen] = useMediaQuery('(max-width: 600px')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authenticated, setAuthenticated } = useContext(AuthContext)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginType>()

  const { isOpen, onToggle } = useDisclosure()

  const toast = useToast()

  const onLogin = async (data: LoginType) => {
    try {
      const response = await HttpClient.post('/auth/login', data)

      sessionStorage.setItem(
        'user',
        JSON.stringify(response.data.data.attributes.user)
      )
      sessionStorage.setItem('token', response.data.data.attributes.token)

      setAuthenticated(true)

      history.navigate('/admin/tarefas')
    } catch (error) {
      toast({
        title: 'Erro de autenticação.',
        description: 'Não foi possível validar seus dados.',
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
        <form onSubmit={handleSubmit(onLogin)}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu email"
                defaultValue={LoginItem.email}
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
                  defaultValue={LoginItem.password}
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={onToggle}>
                    {isOpen ? 'Esconder' : 'Mostrar'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <span style={{ color: 'red' }}>
                  Senha deve ter pelo menos 6 caracteres
                </span>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="pink"
              mt={4}
              width="100%"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>

            {/* TODO: colocar aqui erros retornados da api
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

export default LoginPage
