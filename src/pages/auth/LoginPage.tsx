/* TODO: 
- onLogin message api error
*/
import { Input, Button, FormControl, FormLabel, Box, Flex, Stack, InputGroup, InputRightElement, useDisclosure } from '@chakra-ui/react';
import { redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HttpClient from '../../config/api/httpClient';

type LoginFormData = {
  email: string
  senha: string
}

function LoginPage() {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<LoginFormData>()

    const { isOpen, onToggle } = useDisclosure();

    const onLogin = async (data: LoginFormData) => {
        try{
            const response = await HttpClient.post('/auth/login', data);
            console.log('LoginPage: response:', response.data);

            return redirect("/");
        } catch (error) {
            console.error('LoginPage: Error:', error);
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