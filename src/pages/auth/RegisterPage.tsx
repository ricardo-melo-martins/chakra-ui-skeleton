import { Box, Button, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type FormData = {
  nome: string
  email: string
  senha: string
  senhaConfirma: string
}

function RegisterPage() {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<FormData>()

    const onRegister = async (data: FormData) => {
        try{
            // TODO: colocar interceptor para rastrear url e bearer token
            const response = await axios.post('http://localhost:8000/api/auth/register', data);
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
        <Box w="300px" maxW="md" mx="auto" p={4}>

        <form onSubmit={handleSubmit(onRegister)}>
            
            <Stack spacing={4}>
                <FormControl id="nome">
                    <FormLabel>Nome</FormLabel>
                    <Input type="text" placeholder="Seu nome" {...register("nome", { required: true })}/>
                    {errors.nome && <span style={{ color: 'red' }}>Campo obrigatório</span>}
                </FormControl>
                
                <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Seu email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })}/>
                    {errors.email && <span style={{ color: 'red' }}>Email inválido</span>}
                </FormControl>
                
                <FormControl id="senha">
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" placeholder="Sua senha" {...register("senha", { required: true, minLength: 6 })} />
                    {errors.senha && <span style={{ color: 'red' }}>Senha deve ter pelo menos 6 caracteres</span>}
                </FormControl>

                <FormControl id="confirmaSenha">
                    <FormLabel>Confirmação de Senha</FormLabel>
                    <Input type="password" placeholder="Confirme sua senha" {...register("senhaConfirma", {
                        required: true,
                        // validate: (value) => value === document.querySelector('input[name="senha"]').value,
                    })} />
                    {errors.senhaConfirma && <span style={{ color: 'red' }}>Senhas não coincidem</span>}
                </FormControl>
                
                <Button type="submit" colorScheme="blue" mt={4} w="100%" isLoading={isSubmitting} >
                    Crie Registro
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
  );
}

export default RegisterPage;