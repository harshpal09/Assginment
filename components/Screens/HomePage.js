import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Button, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://dev3.xicom.us/xttest/getdata.php';

const HomePage = ({navigation}) => {
  const [offset, setOffset] = useState(0);
  const [images, setImages] = useState([]);
  const [toggle,setToggle] = useState(false);

  const loadImages = async () => {
    setToggle(true)
    try {
      console.log("Inside try")
      const response = await axios.post(API_URL, {
        user_id: '108',
        offset: offset.toString(),
        type: 'popular',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log("data =>" , response.data.images)

      if (response.data && response.data.images) {
        setImages([...images, ...response.data.images]);
        setOffset(offset + 1);
      }
    } catch (error) {
      console.log("Inside catch")
      console.error('Error fetching images:', error);
    }finally{
      setToggle(false);
    }
  };

  useEffect(() => {
    console.log("Inside useEffect")
    loadImages();
  }, []); 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate('details',{ image : item.xt_image})}>
    <Image
      source={{ uri: item.xt_image }}
      style={{ aspectRatio: 1, width: '100%', height: undefined }}
    />
    </TouchableOpacity>

  );

  return (
    <SafeAreaView style={{justifyContent:'center',alignItems:'center',display:'flex',width:'100%',height:'100%'}}>
      <FlatList 
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // onEndReached={loadImages} 
        onEndReachedThreshold={0.1}
      />
      {toggle && <ActivityIndicator style={{backgroundColor:'transparent'}} size={'large'} />}
      <TouchableOpacity style={{position:'absolute',backgroundColor:'grey',width:'60%',justifyContent:'center',alignContent:'center',display:'flex',height:30,borderRadius:12,margin:10,bottom:10}} onPress={loadImages}>
        <Text style={{width:'100%',fontWeight:'800',textAlign:'center',color:'#000',fontSize:16,}}>Click to Load More...</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;