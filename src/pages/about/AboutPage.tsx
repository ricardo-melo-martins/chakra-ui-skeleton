import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useMediaQuery
} from '@chakra-ui/react'

import { FaRegThumbsUp } from 'react-icons/fa'

function AboutPage() {
  const [isFitScreen] = useMediaQuery('(max-width: 600px')

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
            <Icon as={FaRegThumbsUp} mr={2} /> {/* Ícone dinâmico */}
            {'Sobre'}
          </Heading>
        </VStack>

        <Text>
          Esta é um esqueleto de aplicação de tarefas usando Chakra UI com
          Typescript.
        </Text>
      </Box>
    </Flex>
  )
}

export default AboutPage
