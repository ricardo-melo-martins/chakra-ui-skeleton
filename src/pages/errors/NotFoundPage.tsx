
import { Container, Heading, VStack } from "@chakra-ui/react";

function NotFoundPage() {
    return (
        <Container maxW="container.md" py={4}>
            <VStack>
                <Heading>Page not Found</Heading>
            </VStack>
        </Container>
    );
}

export default NotFoundPage;