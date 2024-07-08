import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center align-middle">
      <Text className="font-bold text-3xl font-pblack">Aora</Text>
      <Link href={"home"} >dsa</Link>
    </View>
  );
}
