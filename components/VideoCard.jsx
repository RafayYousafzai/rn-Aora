import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video"; // Import from expo-video
import { icons } from "../constants";
import { bookmark } from "../lib/appwrite";
import useGlobalContext from "../context/GlobalProvider";

const VideoCard = ({ title, creator, avatar, thumbnail, video, id }) => {
  const { user } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(user?.likes?.includes(id) || false); // Add optional chaining for safety
  const [play, setPlay] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // Track if video is minimized

  // Initialize the video player
  const player = useVideoPlayer(video, (player) => {
    player.loop = false; // Disable looping
    player.muted = false; // Enable sound
  });

  const toggleBookmark = async () => {
    const res = await bookmark(id);
    console.log(res);
    if (res) {
      setIsLiked(!isLiked);
    }
  };

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleFullscreen = () => {
    if (isMinimized) {
      setIsMinimized(false); // Exit minimized mode
      player.play(); // Resume playback
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleBookmark}>
          <Image
            source={isLiked ? icons.ribbon : icons.ribbon_outline}
            className="w-7 h-7"
            resizeMode="contain"
            style={{ tintColor: "white" }}
          />
        </TouchableOpacity>
      </View>

      {play ? (
        <View className="w-full h-60 rounded-xl mt-3">
          <VideoView
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            onPictureInPictureStart={() => setIsMinimized(true)} // Track when minimized
            onPictureInPictureStop={() => setIsMinimized(false)} // Track when restored
            nativeControlsProps={{
              showFullscreenButton: true, // Always show fullscreen button
              showPlaybackControls: !isMinimized, // Hide other controls when minimized
            }}
          />
          {isMinimized && (
            <TouchableOpacity
              onPress={handleFullscreen}
              className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full"
            >
              <Image
                source={icons.fullscreen}
                className="w-6 h-6"
                resizeMode="contain"
                style={{ tintColor: "white" }}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
