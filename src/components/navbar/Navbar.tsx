import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VisuallyHidden,
  chakra,
  useColorModeValue
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { AuthContext } from '../../config/context/AuthContext'
import { useContext } from 'react'
import HttpClient from '../../config/api/httpClient'
import { history } from '../../boot/history'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Props from '../../common/types/Props'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar = (props: Props) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext)

  const handleLogout = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await HttpClient.post('/auth/logout', {})

    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')

    setAuthenticated(false)

    history.navigate('/public/login')
  }

  const bg = useColorModeValue('gray.50', 'gray.900')

  return (
    <chakra.header bg={bg} w="100%">
      <Container maxW="container.md" py={5}>
        <HStack justify="space-between">
          <HStack spacing={10}>
            <Link as={RouterLink} to="/">
              <HStack>
                {/* <Logo height="2rem" /> */}
                <VisuallyHidden>Logo</VisuallyHidden>
              </HStack>
            </Link>

            <Link hidden={Boolean(authenticated)} as={RouterLink} to="/">
              Início
            </Link>
            <Link
              hidden={Boolean(authenticated)}
              as={RouterLink}
              to="public/registro"
            >
              Registro
            </Link>
            <Link
              hidden={Boolean(authenticated)}
              as={RouterLink}
              to="public/sobre"
            >
              Sobre
            </Link>

            <Link
              hidden={Boolean(!authenticated)}
              as={RouterLink}
              to="admin/tarefas"
            >
              Tarefas
            </Link>
          </HStack>
          <ColorModeSwitcher justifySelf="flex-end" />

          <Menu>
            <MenuButton
              hidden={Boolean(!authenticated)}
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
            >
              {'nome do usuario'} <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleLogout()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </chakra.header>
  )
}

export default Navbar
