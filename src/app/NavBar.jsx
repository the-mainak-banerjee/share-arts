import { Avatar, Box, Flex, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Link, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillPlusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsLightningCharge } from 'react-icons/bs'
import { logOut } from '../features/users/usersSlice'
import { useDispatch } from "react-redux";
import { signOut } from 'firebase/auth'
import { auth } from '../services/Firebase'


const NavBar = () => {

    const [showSearchBox, setShowSearchBox] = useState(false)
    const [showMenu,setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()


    const handleLogout = async () => {
        await signOut(auth)
        dispatch(logOut())
        navigate('/auth', {replace: true})
    }



  return (
    <Box position='relative' boxShadow='lg'>
        <Grid width='full' templateColumns='repeat(3,1fr)' justifyItems='center' position='fixed' zIndex='10' alignItems='center' py='5' px={['1','0','0']} backgroundColor='white' diaplay={{base:showSearchBox ? 'none' : 'block', md:'block', lg:'block'}}>
            <GridItem>
                <Link as={NavLink} to='/' fontSize='2xl' fontWeight='medium' color='blue.500'>ShareArts</Link>
            </GridItem>
            <GridItem visibility={{base:'hidden', md:'visible'}}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<BsSearch/>}/>
                    <Input type='text' placeholder='Search'/>
                </InputGroup>
            </GridItem>
            <GridItem>
                <Flex gap={['2','2','4']} alignItems='center'>
                    <IconButton 
                        aria-label='Show User Profile'
                        // variant='unstyle'
                        size='2xl'
                        icon={<BsSearch/>}
                        display={{base:'block', md:'none'}}
                        onClick={() => setShowSearchBox(prevState=> !prevState)}
                    />
                    <Link as={NavLink} to='/createPost' _activeLink={{color:'blue.500'}}>
                        {pathname === '/createPost' ? <AiFillPlusCircle size='25px'/>: <AiOutlinePlusCircle size='28px'/>}
                    </Link>
                    <Link as={NavLink} to='/explore'>
                        <BsLightningCharge size='25px'/>
                        {/* <BsFillLightningCharge size='25px'/> */}
                    </Link>
                    <Avatar
                        size='sm'
                        cursor='pointer'
                        onClick={() => setShowMenu(prevState=>!prevState)}
                    />
                </Flex>
            </GridItem>
            <GridItem colSpan={3} width='full'>
                <InputGroup display={{base: showSearchBox ? 'block' : 'none', md:'none' , lg: 'none'}}>
                    <InputLeftElement pointerEvents='none' children={<BsSearch/>}/>
                    <Input type='text' placeholder='Search' autoFocus/>
                </InputGroup>
            </GridItem>
            {/* {showMenu && <GridItem colSpan={4}>
                <Box width={{base:'30%', md:'15%'}} backgroundColor='white' boxShadow='md'>
                    <Link as={NavLink} to='/profile/123'>
                        <Flex alignItems='center' cursor='pointer' p='2' _hover={{backgroundColor:'gray.50'}} onClick={() => setShowMenu(prevState=>!prevState)}>
                            <Text>Profile</Text>
                            <Spacer/>
                            <FaUserAlt/>
                        </Flex>
                    </Link>
                    <Flex alignItems='center' cursor='pointer' p='2' _hover={{backgroundColor:'gray.50'}} onClick={handleLogout}>
                        <Text>Logout</Text>
                        <Spacer/>
                        <FaUserAlt/>
                    </Flex>
                    
                </Box>
            </GridItem>
            } */}
        </Grid>
        {showMenu && <Box width={{base:'30%', md:'15%'}} backgroundColor='white' boxShadow='md' position='absolute' top='14' right={{base:'2', md:'36'}} zIndex='10'>
            <Link as={NavLink} to='/profile/123'>
                <Flex alignItems='center' cursor='pointer' p='2' _hover={{backgroundColor:'gray.50'}} onClick={() => setShowMenu(prevState=>!prevState)}>
                    <Text>Profile</Text>
                    <Spacer/>
                    <FaUserAlt/>
                </Flex>
            </Link>
            <Flex alignItems='center' cursor='pointer' p='2' _hover={{backgroundColor:'gray.50'}} onClick={handleLogout}>
                <Text>Logout</Text>
                <Spacer/>
                <FaUserAlt/>
            </Flex>
            
        </Box>}
    </Box>
  )
}

export default NavBar
