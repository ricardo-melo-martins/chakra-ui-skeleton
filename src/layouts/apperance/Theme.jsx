import { extendTheme } from '@chakra-ui/react'

const Theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false
  }
})

export default Theme
