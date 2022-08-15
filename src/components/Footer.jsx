import { Box, Container, Flex, Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillGithub, AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai'
import { Link as ReachLink } from 'react-router-dom'

const Footer = () => {

  return (
    <Box as='footer' backgroundColor='#f8f8f8' mt='10' py='2' width='full'>
        <Container centerContent width='container.xl'>
            <Text mb='2' fontSize='2xl' fontWeight='medium' color='blue.500'><Link as={ReachLink} to='/'>ShareArts</Link></Text>
            <Text mb='2'>Made With &hearts; By Mainak in India</Text>
            <Flex gap='6' alignItems='center'>
                <Text>Connect With Me</Text>
                <Flex gap='4'>
                    <Link href='https://github.com/the-mainak-banerjee' target='_blank'>
                        <Icon as={AiFillGithub}/>
                    </Link>
                    <Link href='https://twitter.com/themainakb' target='_blank'>
                        <Icon as={AiFillTwitterSquare}/>
                    </Link>
                    <Link href='https://www.linkedin.com/in/themainakb/' target='_blank'>
                        <Icon as={AiFillLinkedin}/>
                    </Link>
                </Flex>
            </Flex>
        </Container>
    </Box>
  )
}

export default Footer
