import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import { SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';

import api from '../../services/api';

import styles from './styles';
import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

export default function Main({ navigation }) {

    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState();

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get(`/devs`, {
                headers: {
                    user: id
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: id }
        });
        socket.on('match', dev => {
            setMatchDev(dev);
        });

    }, [id]);

    async function handleDislike() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }

    async function handleLike() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }



    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                {
                    users.length == 0 ? <Text style={styles.empty}>Acabou :(</Text> :
                        (
                            users.map((user, index) => (
                                <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                                    <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                    <View style={styles.footer}>
                                        <Text style={styles.name}>{user.name}</Text>
                                        <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                    </View>
                                </View>
                            ))
                        )
                }
            </View>

            {
                users.length > 0 && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={handleDislike} style={styles.button}>
                            <Image source={dislike} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLike} style={styles.button}>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>
                )
            }
{ matchDev && (
    <View style={styles.matchConatiner}>
        <Text style={styles.itsamatch}>Its a Match!!</Text>
        <Image style={styles.matchAvatar} source={{uri: matchDev.avatar }} />
        <Text style={styles.matchName}>{matchDev.name}</Text>
        <Text style={styles.matchBio}>{matchDev.bio}</Text>
        <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>Fechar</Text>
        </TouchableOpacity>
    </View>
)}
        </SafeAreaView>
    )
}