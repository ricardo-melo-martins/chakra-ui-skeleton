
import { Box, Code, Container, Grid, Heading, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { Logo } from "../../Logo";
import { FaCog } from 'react-icons/fa'; // Importe os ícones desejados

function AboutPage() {
    return (
        <Container maxW="container.md" py={4}>
            <VStack align="start" spacing={4}>

                <Heading size="lg" display="flex" alignItems="center">
                    <Icon as={FaCog} mr={2} /> {/* Ícone dinâmico */}
                    {'Sobre'}
                </Heading>

                <Text>
                    Esta é um esqueleto de aplicação usando Chakra UI.
                </Text>
                <Heading>Características</Heading>
                <Text>
                    - <Code fontSize="xl">Typescript</Code>
                </Text>

                <Box textAlign="center" fontSize="xl">
                    <Grid minH="100vh" p={3}>
                        <VStack spacing={4}>
                            <Logo h="40vmin" pointerEvents="none" />
                            
                            <Link
                                color="teal.500"
                                href="https://chakra-ui.com"
                                fontSize="2xl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                            </Link>
                        </VStack>
                    </Grid>
                </Box>
            </VStack>
        </Container>
    );
}

export default AboutPage;