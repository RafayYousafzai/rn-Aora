import { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { getAllBookmarks } from "../../lib/appwrite";

const Bookmark = () => {
  const { data, refetch } = useAppwrite(getAllBookmarks);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSearch = (query) => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm || query === "") {
      setFilteredData(data);
      return;
    }

    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredData);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users.username}
            avatar={item.users.avatar}
            id={item.$id}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                Search Your Bookmarks
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={""}
                  handlePress={(query) => handleSearch(query)}
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
