import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, View , Button} from 'react-native';
import Avatar from './components/Avatar';

interface UserInfo {
  username: string;
  photo: string;
}
export default function App() {
  const [userInfo, onChangeUserInfo] = React.useState<UserInfo>({
    username: '',
    photo: '',
  });

  const [currentStep, setCurrentStep] = React.useState(1);
  const handleNext = () => {
    if (currentStep === 0 && userInfo.username === '') {
      alert('Please pick a username');
      return;
    }
    setCurrentStep(currentStep + 1);
  }
  return (
    <View className="bg-white py-24 px-8">
      <Text className='text-5xl	font-bold'>Welcome</Text>
      <View className='mt-4 flex flex-col'>
        {currentStep === 0 && <TextInput
          onChangeText={(text) => onChangeUserInfo({ ...userInfo, username: text })}
          value={userInfo.username}
          placeholder='Please pick a username'
          className='border-2 border-gray-300 h-14 leading-normal rounded-lg px-2 w-full mt-4 text-md flex items-center'
        />
        }
        {currentStep === 1 && <Avatar />}
        <View className='bg-black p-2 rounded-lg mt-4 text-white'>
          <Button
            title="Next"
            onPress={handleNext}
            color="#fff"
            />
        </View>
      </View>
    <StatusBar style="auto" />
  </View>
  );
}
