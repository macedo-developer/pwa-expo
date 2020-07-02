import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import axios from "axios";

interface ResultBooks {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  accessInfo: {
    webReaderLink: string;
  };
}

const Books: React.FC = () => {
  const navigation = useNavigation();

  const [book, setBook] = useState("");
  const [result, setResult] = useState<ResultBooks[]>([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyAfcWCMB9MYg55KjeRRhVu_ptM8yihfn8E"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=saude&key=${apiKey}&maxResults=20`
      )
      .then((response) => {
        setResult(response.data.items);
        setLoading(false);
      });
  }, []);

  function handleSearch() {
    if (book === "") return alert("Informe o que deseja buscar");

    setLoading(true);

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=20`
      )
      .then((response) => {
        setResult(response.data.items);
        setLoading(false);
      });
  }

  function handleDetails(item: ResultBooks) {
    navigation.navigate("Details", item);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Search Books API Google</Text>
      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          placeholder="Qual seu desejo de hoje?"
          value={book}
          onChangeText={setBook}
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Feather
            name="search"
            size={20}
            color="#000"
            onPress={handleSearch}
          />
          {/* <Text style={styles.buttonText}>Search</Text> */}
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <View style={styles.listResult}>
          <FlatList
            style={{ marginTop: 20 }}
            data={result}
            numColumns={2}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.viewBooks}>
                {
                  <Image
                    style={styles.imageBook}
                    source={{
                      uri:
                        item.volumeInfo.imageLinks === undefined
                          ? "https://oiguassu.com.br/wp-content/themes/fox/images/placeholder.jpg"
                          : item.volumeInfo.imageLinks.thumbnail,
                    }}
                  />
                }

                <Text style={styles.titleBook}>{item.volumeInfo.title}</Text>
                <TouchableOpacity onPress={() => handleDetails(item)}>
                  <Text>Detalhes</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 40,
    backgroundColor: "#45D0C1",
  },
  textTitle: {
    margin: 20,
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    color: "#45D0C1",
    width: "80%",
    height: 52,
  },
  button: {
    backgroundColor: "#fff",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    flexDirection: "row",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },

  loadingView: {
    flex: 1,
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listResult: {
    marginTop: 50,
  },
  viewBooks: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#36a397",
  },
  titleBook: {
    textAlign: "center",
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
  },
  imageBook: {
    width: 72,
    height: 114,
    borderRadius: 5,
  },
});

export default Books;
