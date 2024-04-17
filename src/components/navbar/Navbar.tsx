import { Link as RouterLink } from "react-router-dom";
import {
    Container,
    HStack,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";


function Navbar() {
    const bg = useColorModeValue("gray.50", "gray.900");
    return (
        <chakra.header bg={bg} w="100%">
            <Container maxW="container.md" py={5} >
                <HStack justify="space-between">
                    <HStack spacing={10}>
                        <Link as={RouterLink} to="/">
                            <HStack>
                                {/* <Logo height="2rem" /> */}
                                <VisuallyHidden>Logo</VisuallyHidden>
                            </HStack>
                        </Link>

                        <Link as={RouterLink} to="/">Início</Link>
                        <Link as={RouterLink} to="admin/tarefas">Tarefas</Link>
                        <Link as={RouterLink} to="public/sobre">Sobre</Link>
                    </HStack>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <Link justifySelf="flex-end" as={RouterLink} to="admin/logout">Sair</Link>
                </HStack>
            </Container>
        </chakra.header>
    );
}

export default Navbar;