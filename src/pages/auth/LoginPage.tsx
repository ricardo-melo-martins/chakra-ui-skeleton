import { Input, Button, FormControl, FormLabel, Box, Flex, Stack, InputGroup, InputRightElement, useDisclosure, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import HttpClient from '../../config/api/httpClient';
import { history } from '../../boot/history';

type LoginFormData = {
  email: string
  senha: string
}

type LoginApiData = {
  email: string
  password: string
}

function exchangeData(formData: LoginFormData): LoginApiData {
  const loginApiData: LoginApiData = {
    email: formData.email,
    password: formData.senha
  };
  return loginApiData;
}

function LoginPage() {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<LoginFormData>()

    const { isOpen, onToggle } = useDisclosure();

    const toast = useToast();

    const onLogin = async (data: LoginFormData) => {

        const dataApi = exchangeData(data)

        try{
            const response = await HttpClient.post('/auth/login', dataApi);

            sessionStorage.setItem('user', JSON.stringify(response.data.data.attributes.user)); 
            sessionStorage.setItem('token', response.data.data.attributes.token);
            
            history.navigate('/admin/tarefas');    
            
        } catch (error) {
            sessionStorage.setItem('token', '');

            toast({
                title: 'Erro de autenticação.',
                description: "Não foi possível validar seus dados.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        
        
    };

    return (
        <Flex
            align="center"
            justify="center"
            minHeight="100vh"
        >

            <Box w="300px">

                <form onSubmit={handleSubmit(onLogin)}>
                
                <Stack spacing={4}>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && <span style={{ color: 'red' }}>Email inválido</span>}
                    </FormControl>

                    <FormControl id="senha" isRequired mt={4}>
                        <FormLabel htmlFor='password'>Senha</FormLabel>
                        <InputGroup size='md'>
                        <Input
                            id='password'
                            type={isOpen ? 'text' : 'password'}
                            placeholder='Digite sua senha'
                            {...register("senha", { required: true, minLength: 6 })}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={onToggle}>
                            {isOpen ? 'Esconder' : 'Mostrar'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        {errors.senha && <span style={{ color: 'red' }}>Senha deve ter pelo menos 6 caracteres</span>}
                    </FormControl>

                    <Button type='submit' colorScheme="blue" mt={4} width="100%" isLoading={isSubmitting}>
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
    );
}

export default LoginPage;