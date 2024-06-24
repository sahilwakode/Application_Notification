import { useState } from 'react';
import React from 'react';
import {
  ChakraProvider,
  theme,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Box,
  userResponded,
  ButtonGroup
} from '@chakra-ui/react';
async function notifyUser(notificationText= "Thank you for enabling notification!"){
  if(!("Notification" in window)){
    alert("Browser does not support notification");
  }else if(Notification.permission==="granted"){
    const notification=new Notification(notificationText);
  }else if(Notification.permission!=="denied"){
    await Notification.requestPermission().then((permission) =>{
        if(permission==="granted"){
          const notification=new Notification(notificationText);
        }
    });
  }
}

function App() {
  const [userResponded,setUserResponded]=useState(false);
  // 3 states
  //1. We will show if you want to enable the notif?
  //2. Show Notification related functionality
  //3. Show nothing user has disabled notification 
  async function enableNotifsAndClose(){
    await notifyUser().then(()=>{
      setUserResponded(true);
    });
  }
  function disableNotifsAndClose(){
    setUserResponded(true);
  }
  return (!(userResponded)&& !(Notification.permission==="granted"))?(

    <ChakraProvider theme={theme}>
      <Container>
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>
              Would you like to enable notification? 
            </AlertDescription>
          </Box>
          <Button colorScheme='teal' size='sm' onClick={enableNotifsAndClose}>
            Sure!
          </Button>
          <Button colorScheme='gray' size='sm' onClick={disableNotifsAndClose}>
            No Thanks!
          </Button>
        </Alert>
      </Container>
    </ChakraProvider>
  ):(Notification.permission==="granted")?(
    <ChakraProvider theme={theme}>
      <Button colorScheme='gray' size='sm' onClick={()=> notifyUser("Thanks for watching this video!")}>
        Click to show a Thank You!
      </Button>
    </ChakraProvider>
  ):
  <>
  <h1>You have disabled Notification</h1>
  </>
  ;
}

export default App;
