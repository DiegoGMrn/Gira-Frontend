import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import Sizes from "../../constants/Sizes";
import { useTheme } from "../../components/ThemeProvider";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import data from "../../data/onboarding";
import { NavigationProp } from "@react-navigation/native";

interface OnboardingProps {
  navigation: NavigationProp<any>;
}

const Onboarding = ({navigation}: OnboardingProps) => {
  const flatlistRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  const { dark, colors, setScheme } = useTheme();
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == data.length - 1) return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage == 0) return;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current.scrollToIndex({
      animate: true,
      index: data.length - 1,
    });
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: Sizes.base * 2,
          }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: Sizes.base,
            }}
          >
            {/* Back icon */}
            {/* Hide back button on 1st screen */}
            <AntDesignIcons
              name="left"
              style={{
                fontSize: 25,
                color: colors.tint,
                opacity: currentPage == 0 ? 0 : 1,
              }}
            />
          </TouchableOpacity>

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          <TouchableOpacity onPress={handleSkipToEnd}>
            <Text
              style={{
                fontSize: 18,
                color: colors.tint,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}
            >
              Saltar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: Sizes.base * 2,
            paddingVertical: Sizes.base * 2,
          }}
        >
          {/* Pagination */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              // No. of dots
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage
                        ? colors.tint
                        : colors.tint + "20",
                    marginRight: 8,
                  }}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}
          {currentPage != data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.tint,
              }}
              activeOpacity={0.8}
            >
              <AntDesignIcons
                name="right"
                style={{ fontSize: 18, color: "white", opacity: 0.3 }}
              />
              <AntDesignIcons
                name="right"
                style={{ fontSize: 25, color: "white", marginLeft: -15 }}
              />
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              style={{
                paddingHorizontal: Sizes.base * 2,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.tint,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginLeft: Sizes.base,
                }}
              >
                Empezar
              </Text>
              <AntDesignIcons
                name="right"
                style={{
                  fontSize: 18,
                  color: "white",
                  opacity: 0.3,
                  marginLeft: Sizes.base,
                }}
              />
              <AntDesignIcons
                name="right"
                style={{ fontSize: 25, color: "white", marginLeft: -15 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({ item }) => {
    return (
      <View
        style={{
          width: Sizes.width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginVertical: Sizes.base * 2,
          }}
        >
          <ImageBackground
            source={item.img}
            style={{ width: 335, height: 335 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            paddingHorizontal: Sizes.base * 4,
            marginVertical: Sizes.base * 4,
          }}
        >
          <Text
            style={{ fontSize: 30, textAlign: "center", fontWeight: "bold", color: colors.tint}}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.8,
              textAlign: "center",
              marginTop: 15,
              lineHeight: 28,
              color: colors.text,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background2,
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} backgroundColor={colors.background2} />

      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
        extraData={Sizes.width}
      />

      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
};

export default Onboarding;
