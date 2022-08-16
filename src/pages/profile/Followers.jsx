import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserCard from '../../components/profile/UserCard'
import { selectUserDetails } from '../../features/users/usersSlice'


const Followers = () => {
    const params = useParams()
    const userDetails = useSelector(state => selectUserDetails(state,params.userId))


  return (
    <>
        {userDetails?.followers?.length > 0 && <Flex flexDirection='column' gap='4' px='2' py='4' border='1px' borderColor='blue.300' borderRadius='lg' mb='10' maxW='xl' mx='auto' justifyContent='center'>
            <Text textAlign='center' fontSize='xl' fontWeight='bold'>Followers</Text>
             {userDetails?.followers?.map(followerId => {
                return (
                    <UserCard
                        key={followerId}
                        idOfUser={followerId}
                    />
                )
             })}
        </Flex>}
        {userDetails?.followers?.length === 0 && <Container centerContent>
            <Text fontSize='xl' fontWeight='medium'>No Followers To Display!!</Text>
        </Container>

        }
    </>
  )
}

export default Followers
