import { Avatar, Box, Button, Flex, Heading, Spacer, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link as ReachLink } from 'react-router-dom'
import { selectUserDetails, selectSignedInUser } from '../../features/users/usersSlice'
import { useFollowAction } from '../../hooks/useFollowActions'


const UserCard = ({idOfUser}) => {

  const currUser = useSelector(selectSignedInUser)
  const userDetails = useSelector(state => selectUserDetails(state,idOfUser))
  const currUserDetails = useSelector(state => selectUserDetails(state,currUser?.userId))
  const { handleFollow, loading } = useFollowAction(currUser.userId)



  return (
    <Flex gap='2'>
        <Avatar/>
        <Box>
            <Heading size='md'><Link as={ReachLink} to={`/profile/${idOfUser}`}>{userDetails.name}</Link></Heading>
            <Flex alignItems='center' gap='2' my='1'>
              <Text fontWeight='medium'>{userDetails?.following?.length} Following</Text>
              <Text fontWeight='medium'>{userDetails?.followers?.length} {userDetails?.followers?.length > 1 ? 'Followers' : 'Follower'}</Text>
            </Flex>
        </Box>
        <Spacer/>
        {idOfUser !== currUser.userId && <Button
          colorScheme={userDetails?.followers?.some(id => id === currUser.userId) ? 'gray' : 'blue'} 
          isLoading={loading} 
          disabled={loading}
          onClick={() => handleFollow(idOfUser,userDetails,currUserDetails)} 
        >
            {userDetails?.followers?.some(id => id === currUser.userId) ? 'Unfollow' : 'Follow'}
        </Button>}
    </Flex>
  )
}

export default UserCard
