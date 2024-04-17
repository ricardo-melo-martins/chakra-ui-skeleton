import { useState } from 'react';
import { Input, Button, FormControl, FormLabel, FormHelperText, Box, Flex } from '@chakra-ui/react';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    // const [error, setError] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    // TODO: 
    const handleLogin = async () => {
        // setIsLoggedIn(true);
        // history.push('/tarefas')
        // return redirect("/tarefas");
    };

    return (
        <Flex
            align="center"
            justify="center"
            minHeight="100vh"
        >
            <Box width="300px">
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Senha</FormLabel>
                    <Input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                <Button colorScheme="blue" mt={4} width="100%" onClick={handleLogin}>
                    Entrar
                </Button>

                {error && (
                    <FormHelperText color="red.500" mt={2}>
                        {error}
                    </FormHelperText>
                )}

            </Box>
        </Flex>
    );
}

export default LoginPage;