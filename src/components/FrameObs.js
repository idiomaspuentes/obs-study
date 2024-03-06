import {Text,Image,StyleSheet} from 'react-native'

export default function FrameObs({text,image}){
   
       
    return(
         <>
       {image? <Image source={image}/> : null}
        <Text>{text}</Text>
        </>
    ) }

    const styles = StyleSheet.create({
        imageContainer: {
            flex: 1,
            paddingTop: 58,
            color:'#fff',
          },
        image :{
            width: 320,
            height: 440,
            borderRadius: 18,
        }

    })