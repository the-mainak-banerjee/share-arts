import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Text,
  FormHelperText,
  useToast
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/Firebase";


const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail)

export const Login = ({ setShowLogin, onToggle, from }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
      email: '',
      password: ''
  })
  const [loading,setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
 

  
  const isValidEmail =formData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = formData.password.length > 6


  const logIn = async (email,password) => {
    setLoading(true)

    try{
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)
        localStorage.setItem('share-art-tocken', userCredentials.user.accessToken)
        navigate(from, {replace: true})
    }catch(error){
        if(error.code === 'auth/user-not-found'){
            toast({
                title: 'Invalid Login Credenials',
                status: 'error'
            })
        }else if(error.code === 'auth/wrong-password'){
            toast({
                title: 'You entered wrong password.',
                status: 'error'
            })
        }else{
            toast({
                title: 'An error occured.',
                status: 'error'
            })
        }
    }finally {
        setLoading(false)
    }
}


  const handleLogin = (e) => {
      e.preventDefault()
      logIn(formData.email, formData.password)
  }

  const handleGuestLogin = () => {
    setFormData({
      email: 'guest@gmail.com',
      password: 'guest_123'
    })
  }

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleShowSignUp = () => {
    setShowLogin(false)
    onToggle()
  }


  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor= "whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CMdEmail color="gray.300" />}
                  />
                  <Input 
                    type="email" 
                    placeholder="email address" 
                    isInvalid={!isValidEmail && formData.email}
                    errorBorderColor='red.300'
                    value={formData.email}
                    onChange={(e) => setFormData(prevState =>({...prevState, email:e.target.value}))}/>
                </InputGroup>
                <FormHelperText>
                  {formData.email && !isValidEmail && <Text color='red.500'>Email is Invalid</Text>}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    isInvalid={!isValidPassword && formData.password }
                    errorBorderColor='red.300'
                    value={formData.password}
                    onChange={(e) => setFormData(prevState =>({...prevState, password:e.target.value}))}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  {formData.password && !isValidPassword && <Text color='red.500'>Password Should be more than 6 character</Text>}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme='blue'
                width="full"
                isLoading={loading}
                loadingText='Logging In...'
                disabled={!isValidPassword || !isValidEmail || loading}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Text onClick={handleGuestLogin} textAlign='right' cursor='pointer' _hover={{textDecoration: 'underline'}}>Use Guest Login</Text>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Flex gap='2'>
        <Text> New to us? </Text>
        <Text onClick={handleShowSignUp} color='blue.500' cursor='pointer'>
          Sign Up
        </Text>
      </Flex>
    </Flex>
  );
};

