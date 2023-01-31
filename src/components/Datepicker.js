import { View, Text, TouchableHighlight, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment';

const Datepicker = (props) => {
    const { textStyle, defaultDate } = props;

    const [date, setDate] = useState(moment(defaultDate));
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        setDate(moment(selectedDate));
    }

    const onPressCancel = () => {
        setDate(moment(defaultDate));
        setShow(false)
    };

    const onPressDone = () => {
        props.onDateChange(date);
        setShow(false)
    };


  return (
    <TouchableHighlight
        activeOpacity={0}
        onPress={() => setShow(true)}
    >
        <View>
            <Text style={textStyle}>{date.format('MMMM-DD-YYYY')}</Text>
            <Modal
                transparent={true}
                animationType="slide"
                visible={show}
                supportedOrientations={['portrait']}
                onRequestClose={() => setShow(false)}
            >
                <View style={{ flex: 1 }}>
                    <TouchableHighlight 
                        style={{ 
                            flex: 1,
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                        }}
                        activeopacity={1}
                        visible={show}
                        onPress={() => setShow(false)}
                    >
                        <TouchableHighlight
                            underlayColor={'#ffffff'}
                            style={{ 
                                flex: 1,
                                borderTopColor: '#ff6600',
                                borderTopWidth: 1
                            }}
                            onPress={() => console.log('datepicker click')}
                        >
                            <View
                                style={{ 
                                    backgroundColor: '#ffffff',
                                    height: 500,
                                    overflow: 'hidden'
                                }}
                            >
                                <View style={{ marginTop: 20 }}>
                                    <DateTimePicker 
                                        timeZoneOffsetInMinutes={0}
                                        value={new Date(date)}
                                        mode="date"
                                        minimumDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
                                        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                                        onChange={onChange}
                                    />
                                </View>

                                <TouchableHighlight 
                                    underlayColor={'transparent'}
                                    onPress={onPressCancel}
                                    style={[styles.btnText, styles.btnCancel]}
                                    >
                                        <Text>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    underlayColor={'transparent'}
                                    onPress={onPressDone}
                                    style={[styles.btnText, styles.btnDone]}
                                    >
                                        <Text>Done</Text>
                                </TouchableHighlight>
                            </View>
                        </TouchableHighlight>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    </TouchableHighlight>
  )
}

Datepicker.defaultProps = {
    textStyle: {},
    defaultDate: moment(),
    onDateChange: () => {}
}

const styles = StyleSheet.create({
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCancel: {
        right: 0,
    },
    btnDone: {
        right: 0,
    }
});
export default Datepicker