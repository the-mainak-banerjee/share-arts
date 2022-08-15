import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  SlideFade,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Login } from "../features/users/auth/Login";
import { Signup } from "../features/users/auth/Signup";
import { useLocation } from "react-router-dom";


const Auth = () => {

  const [showLogin,setShowLogin] = useState(false)
  const location = useLocation()
  const { isOpen, onToggle } = useDisclosure()
  const from = location.state?.from?.pathname ?? '/'


  useEffect(() => {
    if(location.state?.logIn === true){
      setShowLogin(true)
      onToggle()
    }
    
    // eslint-disable-next-line
  },[location])

 

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
                    from={from}
                  />
                </SlideFade>
            ) : (
                <Signup
                  onToggle={onToggle}
                  setShowLogin = {setShowLogin}
                  from={from}
                />
            )
          }
       
    </Flex>
  );
};

export default Auth