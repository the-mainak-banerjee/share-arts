import { Box, Button, Flex, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillPlusCircle } from 'react-icons/ai'

const NavBar = () => {

    const [showSearchBox, setShowSearchBox] = useState(false)

  return (
    <Box>
        <Grid  width='full'  templateColumns='repeat(3,1fr)' justifyItems='center' alignItems='center' py='5' px={['1','0','0']} backgroundColor='gray.50' diaplay={{base:showSearchBox ? 'none' : 'block', md:'block', lg:'block'}}>
            <GridItem>
                <Link as={NavLink} to='/' fontSize='2xl' fontWeight='medium'>ShareArts</Link>
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
                        variant='unstyle'
                        size='2xl'
                        icon={<BsSearch/>}
                        display={{base:'block', md:'none'}}
                        onClick={() => setShowSearchBox(prevState=> !prevState)}
                    />
                    <Link as={NavLink} to='/createPost'>
                        <IconButton 
                            aria-label='Show User Profile'
                            variant='unstyle'
                            size='2xl'
                            icon={<AiFillPlusCircle/>}
                            marginBottom='1'
                        />
                    </Link>
                    <Link as={NavLink} to='/profile/890'>
                        <IconButton 
                            aria-label='Show User Profile'
                            variant='unstyle'
                            size='xl'
                            icon={<FaUserAlt/>}
                            marginBottom='1'
                        />
                    </Link>
                    <Button size={['xs','sm', 'sm']} colorScheme='red'>
                        Logout
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={3} width='full'>
                <InputGroup display={{base: showSearchBox ? 'block' : 'none', md:'none' , lg: 'none'}}>
                    <InputLeftElement pointerEvents='none' children={<BsSearch/>}/>
                    <Input type='text' placeholder='Search' autoFocus/>
                </InputGroup>
            </GridItem>
        </Grid>
    </Box>
  )
}

export default NavBar
