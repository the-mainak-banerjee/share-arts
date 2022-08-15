import { Flex, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { seletAllUsers } from '../../features/users/usersSlice'
import UserCard from '../profile/UserCard'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults,setSearchResults] = useState(null)
    const allUsers = useSelector(seletAllUsers)
    const location = useLocation()

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        setSearchTerm('')
    }, [location])

    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchTerm.length > 0){
                const filterdData = allUsers?.filter(user => {
                    return user.name.toLowerCase().includes(searchTerm.toLowerCase())
                })
                setSearchResults(filterdData)
            }else{
                setSearchResults(null)
            }
        },300)
        return () => clearTimeout(timer)
    },[searchTerm,allUsers])


  return (
   <>
        <InputGroup>
            <InputLeftElement pointerEvents='none' children={<BsSearch/>}/>
            <Input type='text' placeholder='Search' value={searchTerm} onChange={(e) => handleChange(e)}/>
            {searchTerm && <InputRightElement children={<AiOutlineClose/>} cursor='pointer' onClick={() => setSearchTerm('')}/>}
        </InputGroup>
        <Flex display={searchTerm ? 'block' : 'none'} py='4' px='2' gap='4' width='full' position='absolute' top='10' backgroundColor='white' zIndex='10' border='1px' borderColor='blue.300'>
            <>
                {searchResults?.length === 0
                    ? (
                        <>
                            <Text textAlign='center'>No Results Found</Text>
                        </>
                    ) : (
                        <>
                            {searchResults?.map(item => {
                                return (
                                    <UserCard key={item.id} idOfUser={item.id}/>
                                )
                            })}
                        </>
                    )
                }
                {searchResults === null && <>
                    {Array.of('1','2','3').map(item => {
                        return(
                            <Flex key={item} gap='2' alignItems='center' px='2' mb='2'>
                                <SkeletonCircle size='10'/>
                                <Skeleton height='15px' width='25%'/>
                            </Flex>
                            )
                        })
                    }
                
                </>}
            </>
                    
        </Flex>
   </>
  )
}

export default SearchBar
