import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
  FormHelperText
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { auth, db } from "../../../services/Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'



const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail)

export const Signup = ({ onToggle, setShowLogin }) => {

  const [loading,setLoading]= useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
      name: '',
      email: '',
      password: ''
  })
  const navigate = useNavigate()
  // const location = useLocation()
  

  const isValidName = formData.name.trim().length > 2
  const isValidEmail =formData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = formData.password.length > 6

  // Create a user doc in database
  const createUser = async (docRef,data) => {
    try{
        await setDoc(doc(db,'users', `${docRef}`),data)
    }catch(error){
        console.log(error)
    }
  }

  // Handle signup
  const signUp = async (email,password,name) => {
    setLoading(true)
    try{
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
      
      await updateProfile(auth.currentUser, {displayName: name})
      localStorage.setItem('share-art-tocken', userCredentials.user.accessToken)

      createUser(userCredentials.user.uid, {
          userId: userCredentials.user.uid,
          name: name,
          email: email,
          followers: [],
          following: [],
          dateCreated: serverTimestamp()
      })

      navigate('/', {replace: true})

    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleSignup = (e) => {
      e.preventDefault()
      signUp(formData.email,formData.password,formData.name)
      // console.log(formData)
  }

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    setShowLogin(true)
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
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                  type="text" 
                  placeholder="full name" 
                  isInvalid={!isValidName && formData.name}
                  errorBorderColor='red.300'
                  onChange={(e) => setFormData(prevState =>({...prevState, name:e.target.value}))}/>
                </InputGroup>
              </FormControl>
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
                disabled={!isValidPassword || !isValidEmail || loading}
                isLoading={loading}
                loadingText='Signing Up...'
                onClick={handleSignup}
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Flex gap='2'>
        <Text>Already Have An Account?</Text>
        <Text onClick={handleLogin}  color='blue.500' cursor='pointer'>
          Log In
        </Text>
      </Flex>
    </Flex>
  );
};

