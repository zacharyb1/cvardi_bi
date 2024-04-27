import React, { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserCircleIcon } from 'react-native-heroicons/solid';

export default function Avatar() {
  //'test-image: 'https://images.pexels.com/photos/20393333/pexels-photo-20393333/free-photo-of-a-woman-with-a-flower-face-paint-on-her-face.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
  const [image, setImage] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      const { status: mediaLibStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

 
  return (
    <View className='flex flex-col justify-center items-center' style={{ justifyContent: 'center', alignItems: 'center' }}>
      {image ? <Image 
        source={{ uri: image }} 
        style={{ width: 120, height: 120, borderRadius: 100}}
        className='rounded-full border-2 border-gray-300'
      />
        : <UserCircleIcon className="text-gray-500" size={120} color={'#e5e7eb'}/>
    }
      <Button title="Take a photo" onPress={takePhoto} />
    </View>
  );
}
