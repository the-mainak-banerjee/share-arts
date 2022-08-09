import { useState } from "react";
import {
  Flex,
  Heading,
  SlideFade,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Login } from "../features/users/auth/Login";
import { Signup } from "../features/users/auth/Signup";


const Auth = () => {

  const [showLogin,setShowLogin] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  
 

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      gap='2'
      backgroundColor='#f8f8f8'
    >
        {/* <Image
          src='../../../assets/homepageimg.png'
          boxSize='100px'
          objectFit='cover'
        /> */}
        <Heading>Share-Arts</Heading>
        <Text fontSize='lg' textAlign='center' px='4' mb='4' w='30%'>Start Sharing Your Arts and Connect With Fellow Artists</Text>
  
          {showLogin
            ?(
                <SlideFade in={isOpen}>
                  <Login
                    setShowLogin={setShowLogin}
                    onToggle={onToggle}
                  />
                </SlideFade>
            ) : (
                <Signup
                  onToggle={onToggle}
                  setShowLogin = {setShowLogin}
                />
            )
          }
       
    </Flex>
  );
};

export default Auth