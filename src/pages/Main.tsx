import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

interface Member {
  login: string;
  avatar_url: string;
}

const Main: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/members").then((response) => {
      response.json().then((data) => {
        setMembers(data);
      });
    });
  }, []);

  return (
    <FlatList
      contentContainerStyle={{ padding: 24 }}
      style={{ flex: 1 }}
      data={members}
      keyExtractor={(member) => member.login}
      renderItem={({ item: member }) => (
        <View style={styles.member}>
          <Image style={styles.image} source={{ uri: member.avatar_url }} />
          <Text>{member.login}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  member: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 42,
    marginRight: 16,
  },
});

export default Main;
