import { View, Text, FlatList, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import slides from '../global/slides';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';


export default function Onboarding() {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentageThreshold: 50}).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({index: currentIndex + 1})
        }else{
           try {
             await AsyncStorage.setItem('@viewedOnboarding', 'true');
           } catch (error) {
                console.log('Error @setItem', error)
           }
        }
    }

  return (
    <View className="flex-1 items-center justify-center bg-white">
        <View style={{ flex: 3 }}>
            <FlatList
                data={slides}
                renderItem={({item}) => <OnboardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={32}
                viewabilityConfig={viewConfig}
                ref={slidesRef}

            />
        </View>

        <Paginator data={slides} scrollX={scrollX} />

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text className="text-[#FF6600] text-lg space-y-4">Skip</Text>
        </TouchableOpacity>

        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  )
}