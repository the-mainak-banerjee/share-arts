import { Avatar, Box, Button, Flex, Icon, Link, Spacer, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { BsCardImage, BsFillImageFill, BsSearch } from 'react-icons/bs'
import { FaUserAlt, FaUserMinus } from 'react-icons/fa'
import { AiFillPlusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { logOut } from '../../features/users/usersSlice'
import { useDispatch, useSelector } from "react-redux";
import { signOut } from 'firebase/auth'
import { auth } from '../../services/Firebase'
import { selectSignedInUser, selectUserDetails } from '../../features/users/usersSlice'
import SearchBar from './SearchBar'


const NavBar = () => {

    const [showSearchBox, setShowSearchBox] = useState(false)
    const [showMenu,setShowMenu] = useState(false)
    const currUser = useSelector(selectSignedInUser)
    const currUserDetails = useSelector(state => selectUserDetails(state,currUser.userId))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        setShowMenu(false)
        setShowSearchBox(false)
    }, [location])


    const handleLogout = async () => {
        await signOut(auth)
        dispatch(logOut())
        navigate('/auth', {replace: true})
    }

    return(
        <>
            <Box boxShadow='lg' width='100%' py='6' position='fixed' zIndex='10' backgroundColor='#f8f8f8'>
                <Flex as='nav' align='center' justifyContent='space-around' gap='4' px={[4,10,36]}>

                    <Text fontSize='2xl' fontWeight='medium' color='blue.500'><Link as={NavLink} to='/'>ShareArts</Link></Text>
                    <Box visibility={{base:'hidden', md:'visible'}} position='relative' justifyContent='center' w='30%'>
                        <SearchBar/>
                    </Box>
                    
                    <Flex gap={['2','2','4']} alignItems='center' position='relative'>
                        <Icon
                            as={BsSearch}
                            h={6}
                            w={6}
                            display={{base:'block', md:'none'}}
                            onClick={() => setShowSearchBox(prevState=> !prevState)}
                        />
                        
                        {currUser.userId && <Link as={NavLink} to='/createPost' _activeLink={{color:'blue.500'}}>
                            {location.pathname === '/createPost' ? <AiFillPlusCircle size='25px'/>: <AiOutlinePlusCircle size='28px'/>}
                        </Link>}
                        
                        {currUser.userId &&  <Link as={NavLink} to='/friendsPost' _activeLink={{color:'blue.500'}}>
                            {location.pathname === '/friendsPost' ? <BsFillImageFill size='25px'/>: <BsCardImage size='28px'/>}
                        </Link>}

                       {currUser.userId 
                       ? (
                           <Avatar
                                size='sm'
                                src={currUserDetails?.profileImage}
                                cursor='pointer'
                                onClick={() => setShowMenu(prevState=>!prevState)}
                            />
                       ): (
                            <>
                                <Button colorScheme='blue' variant='outline' onClick={() => navigate('/auth', {state:{from: location, logIn:true}})}>LogIn</Button>
                                <Button colorScheme='blue' onClick={() => navigate('/auth', {state:{from: location}})}>SignUp</Button>
                            </>
                       )
                    }

                        {showMenu && <Box backgroundColor='white' boxShadow='md' position='absolute' top='10' right={{base:'2', md:'0'}} zIndex='10'>
                            <Link as={NavLink} to={`/profile/${currUser.userId}/posts`}>
                                <Flex alignItems='center' gap='2' cursor='pointer' p='2'  _hover={{backgroundColor:'gray.50'}} onClick={() => setShowMenu(prevState=>!prevState)}>
                                    <Text>Profile</Text>
                                    <Spacer/>
                                    <Icon
                                        as={FaUserAlt}
                                        h={4}
                                        w={4}
                                    />
                                </Flex>
                            </Link>
                           
                            <Flex alignItems='center' gap='2' cursor='pointer' p='2' _hover={{backgroundColor:'gray.50'}} onClick={handleLogout}>
                                <Text>Logout</Text>
                                <Spacer/>
                                <Icon
                                    as={FaUserMinus}
                                    h={5}
                                    w={5}
                                />
                            </Flex>       
                        </Box>}

                    </Flex>
                </Flex>
                <Box display={{base: showSearchBox ? 'block' : 'none', md:'none' , lg: 'none'}} position='relative' mx='4' mt='2'>
                    {/* <InputGroup>
                        <InputLeftElement pointerEvents='none' children={<BsSearch/>}/>
                        <Input type='text' placeholder='Search' autoFocus/>
                    </InputGroup> */}
                    <SearchBar/>
                </Box>
            </Box>

        </>
    )
}

export default NavBar
