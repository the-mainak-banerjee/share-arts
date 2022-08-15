import { Box, Container, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

const PostSkeleton = () => {
  return (
    <Container px='0' pt='4' maxW='xl' backgroundColor='white' border='1px' borderColor='blue.300' borderRadius='lg' boxShadow='lg' position='relative'>
        <Flex gap='2' alignItems='center' px='2'>
            <SkeletonCircle size='10'/>
            <Skeleton height='15px' width='25%'/>
        </Flex>
        <Box position='relative' mt='4' width='full' border='1px' borderColor='#f4f4f4'>
            <Skeleton height='lg'/>
        </Box>
    </Container>
  )
}

export default PostSkeleton
