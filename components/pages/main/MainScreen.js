import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  TouchableOpacity,
  PanResponder,
  Easing,
} from 'react-native';
import MenuBarIcon from '../../../assets/images/svg/auth/MenuBar';
import GlobalIcon from '../../../assets/images/svg/auth/Global';
import LanguagesBlock from '../../includes/main/LanguagesBlock';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {openMenu, closeMenu} from '../../redux/actions/actions';
import MenuBarPopup from './Popup/MenuBar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Connected from '../../../assets/images/svg/main/Connected';
import DownloadBlock from '../../includes/main/DowloadBlock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisconnectedIcon from '../../../assets/images/svg/main/Disconnect';

export default function App({navigation}) {
  const {open_menu_bottom_sheet, close_menu_bottom_sheet, allData} =
    useSelector(state => state.justDriveReducer);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [totalDuration, setTotalDuration] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const targetDate = new Date(allData.data?.end_date); // Set your target date here
  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      navigation.navigate('AuthScreen');
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      const ids = await AsyncStorage.getItem('country_id');
      setCountryName(value);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // console.log(allData);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../../assets/images/png/HomeScreen.png')}>
      {open_menu_bottom_sheet ? (
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.63)" />
      ) : (
        ''
      )}
      <SafeAreaView style={styles.areastyles}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => dispatch(openMenu())}>
            <MenuBarIcon />
          </TouchableOpacity>
          <Text style={styles.headerText}>SS24</Text>
          <View></View>
        </View>
        <ScrollView style={{width: '100%', flex: 1, paddingHorizontal: 18}}>
          <LanguagesBlock name={countryName} />
          <DownloadBlock />
          <View style={styles.connectedDiv}>
            <TouchableOpacity
              onPress={() => {}}
              style={styles.connectedWhiteBlock}>
              {targetDate == new Date() ? (
                <AnimatedCircularProgress
                  size={200}
                  width={10}
                  fill={progress}
                  tintColor="#00e0ff"
                  backgroundColor="#CC6633">
                  {fill => (
                    <View style={{alignItems: 'center'}}>
                      <DisconnectedIcon />
                      <Text style={[styles.connected, {color: '#CC6633'}]}>
                        Disconnected
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              ) : (
                <AnimatedCircularProgress
                  size={200}
                  width={10}
                  fill={progress}
                  tintColor="#00e0ff"
                  backgroundColor="#33CC8C">
                  {fill => (
                    <View style={{alignItems: 'center'}}>
                      <Connected />
                      <Text style={styles.connected}>Connected</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.timerBlock}>
            <Text style={styles.following}>Время до окончания подписки</Text>
            <Text style={styles.timer}>
              {remainingTime.days}d {remainingTime.hours}h{' '}
              {remainingTime.minutes}m {remainingTime.seconds}s
            </Text>
            <Text style={styles.code}>ВАШ КОД: {allData.data.code}</Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.banner}>
            <LinearGradient
              colors={['#0072FF', '#00C6FF']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>МЕСТО ДЛЯ БАНЕРА</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {open_menu_bottom_sheet ? <MenuBarPopup /> : ''}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  areastyles: {
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  header: {
    // width: '100%',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    color: '#252626',
  },
  nameBlock: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  centerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBlockText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#252626',
    marginLeft: 10,
  },
  footer: {
    padding: 18,
  },
  banner: {
    width: '100%',
  },
  linearGradient: {
    width: '100%',
    height: 80,
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  progress: {
    margin: 10,
  },
  connected: {
    fontSize: 16,
    color: '#33CC8C',
    marginTop: 24,
  },
  connectedDiv: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
  },
  connectedWhiteBlock: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
    // shadowOffset:{width:0, height:3},
    shadowOpacity: 0.5,
    shadowRadius: 10000,
    shadowColor: '#52006A',
    // elevation: 20,
  },
  timerBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  following: {
    fontSize: 12,
    color: '#565859',
    fontWeight: '400',
  },
  timer: {
    marginTop: 7,
    color: '#252626',
    fontSize: 24,
    fontWeight: '500',
  },
  code: {
    color: '#878B8C',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 7,
  },
});
