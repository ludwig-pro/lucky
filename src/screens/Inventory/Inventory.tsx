import * as React from "react";
import { matchSorter } from "match-sorter";
import { ScrollView } from "react-native";

import { Box, SearchBar } from "../../components";

import Card from "./Card";

const PLACEHOLDER_TEXT = "Search 4 items";

export const assets = [
  require("../../../assets/cartier_ring.png"),
  require("../../../assets/lou_necklace.jpg"),
  require("../../../assets/chanel_pearl.jpg"),
  require("../../../assets/rolex_daytona.jpg"),
];

const items = [
  {
    id: 1,
    rank: 1,
    name: "Cartier Ring",
    price: 5780,
    source: assets[0],
  },
  {
    id: 2,
    rank: 2,
    name: "Lou. Yetu Necklace",
    price: 60,
    source: assets[1],
  },
  {
    id: 3,
    rank: 3,
    name: "Chanel Pearl Bracelet",
    price: 2100,
    source: assets[2],
  },
  {
    id: 4,
    rank: 4,
    name: "Rolex watch",
    price: 10090,
    source: assets[3],
  },
  {
    id: 5,
    rank: 5,
    name: "Cartier Ring #2",
    price: 5780,
    source: assets[0],
  },
  {
    id: 6,
    rank: 6,
    name: "Lou. Yetu Necklace #2",
    price: 60,
    source: assets[1],
  },
  {
    id: 7,
    rank: 7,
    name: "Chanel Pearl Bracelet #2",
    price: 2100,
    source: assets[2],
  },
  {
    id: 8,
    rank: 8,
    name: "Rolex watch #2",
    price: 10090,
    source: assets[3],
  },
];

const searchConfig = {
  keys: [{ threshold: matchSorter.rankings.STARTS_WITH, key: "name" }],
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [inventories, setInventories] = React.useState(items);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  React.useEffect(() => {
    const match = matchSorter(items, searchQuery, searchConfig);
    setInventories(match);
  }, [searchQuery]);

  console.log("searchQuery", searchQuery);
  return (
    <ScrollView>
      <Box
        paddingHorizontal="ml"
        paddingTop="s"
        paddingBottom="ml"
        backgroundColor="white"
      >
        <SearchBar
          placeholder={PLACEHOLDER_TEXT}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Box>
      <Box
        paddingTop="ml"
        paddingHorizontal="ml"
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {inventories
          .sort((a, b) => a.rank - b.rank)
          .map((item) => (
            <Box key={item.id} paddingBottom="ml">
              <Card title={item.name} price={item.price} source={item.source} />
            </Box>
          ))}
      </Box>
    </ScrollView>
  );
};

export default Inventory;
