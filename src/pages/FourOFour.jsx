import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FourOFour = () => {

    const navigate = useNavigate()


  return (
    <Box as='section' pt='32' minHeight='100vh'>
        <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='2' height='60vh'>
            <Text fontWeight='bold' fontSize='3xl' color='red'>404</Text>
            <Text fontSize='lg'>You Landed In A Wrong Page </Text>
            <Button onClick={() => navigate('/', {replace: true})}>Back To Home</Button>
        </Flex>
    </Box>
  )
}

export default FourOFour
