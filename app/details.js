import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8F7FB",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Top Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
          }}
          style={{
            width: "95%",
            height: 270,
            borderRadius: 30,
            alignSelf: "center",
            marginTop: 20,
          }}
        />

        {/* Title */}
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "600",
              color: "#2D1E4A",
            }}
          >
            Mindful Breathing
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#7B748C",
              }}
            >
              calmness
            </Text>

            <Ionicons
              name="time-outline"
              size={18}
              color="#7B748C"
              style={{ marginLeft: 10 }}
            />

            <Text
              style={{
                fontSize: 18,
                color: "#7B748C",
                marginLeft: 4,
              }}
            >
              10 minutes
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 35,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#2D1E4A",
              paddingVertical: 14,
              paddingHorizontal: 35,
              borderRadius: 18,
              marginRight: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              About
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#ECEAF2",
              paddingVertical: 14,
              paddingHorizontal: 30,
              borderRadius: 18,
            }}
          >
            <Text
              style={{
                color: "#A7A1B5",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Instructions
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 22,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "500",
              color: "#2D1E4A",
              marginBottom: 20,
            }}
          >
            About Mindful Breathing:
          </Text>

          <Text
            style={{
              fontSize: 19,
              lineHeight: 32,
              color: "#7B748C",
            }}
          >
            Focus on your breath and maintain a steady rhythm to
            clear your mind and reduce stress.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingBottom: 25,
          alignItems: "center",
        }}
      >
        {/* Heart Button */}
        <TouchableOpacity
          style={{
            width: 65,
            height: 65,
            borderWidth: 1.5,
            borderColor: "#FF7A59",
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
            backgroundColor: "#fff",
          }}
        >
          <Ionicons name="heart-outline" size={28} color="#FF7A59" />
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={() => router.push("/session")}
          style={{
            flex: 1,
            backgroundColor: "#FF7A59",
            height: 65,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Add to favorites
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}