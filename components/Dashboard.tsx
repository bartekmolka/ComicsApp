import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import { Comic, RootStackParamList } from "../App";
import ComicCard from "./ComicCard";

// Defining type for DashboardProps
type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// Setting up splash screen
SplashScreen.preventAutoHideAsync();

// Dashboard component
export function Dashboard({ navigation }: DashboardScreenProps) {

    const [appIsReady, setAppIsReady] = useState(false);
    const [comics, setComics] = useState<Comic[]>([]);
    const [comicId, setComicId] = useState(0);

    // Initial set up 
    useEffect(() => {
        const fetchComics = async () => {
           try {
                // Getting last comic number
                const response = await axios.get('https://xkcd.com/info.0.json');
                const lastComicNum = response.data.num;

                // Array of last 3 comic numbers
                const comicNums = [];
                for(let i = 0; i < 3; i++) {
                    comicNums.push(lastComicNum - i);
                }

                // Fetching 3 last comics data
                const comicsData = await Promise.all(
                    comicNums.map(async (number) => {
                        const comicResponse = await axios.get(
                            `https://xkcd.com/${number}/info.0.json`
                        );
                        return comicResponse.data;
                    })
                );

                // Setting states
                setComics(comicsData);
                setComicId(lastComicNum - 5);
                
                // Hiding splash screen
                setAppIsReady(true);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComics();
    }, []);

    // Function to hide splash screen
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }

    // Render comic card item, when pressed navigate to ComicDetails screen
    function renderItem({ item }: { item: Comic }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ComicDetails', {
                comicId: comicId,
                comic: item
            })}>
                <ComicCard {...item} />
            </TouchableOpacity>
        )
    }

    // Loading comics from API
    async function loadComics(comicId: number) {
        try {
            //Getting comic with specific id
            const response = await axios.get(`https://xkcd.com/${comicId}/info.0.json`);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }

    // Handle scrolling to load more comics
    async function handleLoadMore() {
        if (comicId > 0) {
            setComics([...comics, await loadComics(comicId)]);
            setComicId(comicId - 1);
        }
    };

    return (
        <FlatList 
            onLayout={onLayoutRootView}
            keyExtractor={() => Math.random().toString()}
            data={comics} 
            renderItem={renderItem}
            contentContainerStyle={{ backgroundColor: "#90e0ef", gap: 50, padding: 50, minHeight: "100%" }}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
        />
    );
}

