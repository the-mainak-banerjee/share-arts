import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserCard from '../../components/profile/UserCard'
import { selectUserDetails } from '../../features/users/usersSlice'


const Following = () => {
    const params = useParams()
    const userDetails = useSelector(state => selectUserDetails(state,params.userId))



  return (
    <>
        {userDetails?.following?.length > 0 && <Flex flexDirection='column' gap='4' px='2' pt='4' border='1px' borderColor='blue.300' borderRadius='lg' mb='10' maxW='xl' mx='auto' justifyContent='center'>
             {userDetails?.following?.map(followingUserId => {
                return (
                    <UserCard
                        key={followingUserId}
                        idOfUser={followingUserId}
                    />
                )
             })}
        </Flex>}
        {userDetails?.following?.length === 0 && <Container centerContent height='80vh' width='container.xl'>
            <Text fontSize='xl' fontWeight='medium'>No Followers To Display!!</Text>
        </Container>

        }
    </>
  )
}

export default Following
