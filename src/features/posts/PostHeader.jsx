import React from 'react'
import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const PostHeader = ({showAction, setShowAction}) => {
  return (
    <>
        <Flex gap='2' alignItems='center'>
            <Image
                src='../../../assets/images.jpg'
                boxSize='30px'
                borderRadius='50%'
            />
            <Text fontWeight='medium'>UserName</Text>
            <Spacer/>
            <BsThreeDotsVertical cursor='pointer' onClick={() => setShowAction(prevState => !prevState)}/>
        </Flex>
        {showAction && <Box backgroundColor='white' boxShadow='md' p='2' position='absolute' top='8' right='2' zIndex='10'>
            <Text>Edit Post</Text>
            <Text>Delete Post</Text>
        </Box>}
    </>
  )
}

export default PostHeader
