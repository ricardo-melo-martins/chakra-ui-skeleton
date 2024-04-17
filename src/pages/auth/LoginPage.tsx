import { Input, Button, FormControl, FormLabel, Box, Flex, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type LoginFormData = {
  email: string
  senha: string
}

function LoginPage() {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<LoginFormData>()

    const onLogin = async (data: LoginFormData) => {
        try{
            // TODO: colocar interceptor para rastrear url e bearer token
            const response = await axios.post('http://localhost:8000/api/auth/login', data);
            console.log('RegisterPage: response:', response.data);
        } catch (error) {
            console.error('RegisterPage: Error:', error);
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

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && <span style={{ color: 'red' }}>Email inválido</span>}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("senha", { required: true, minLength: 6 })}
                        />
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