import * as React from "react";
import { matchSorter } from "match-sorter";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInventorByUserId,
  getInventoryValuableObject,
  FormatedValuableObject,
} from "../../models/reducers/inventory";

const searchConfig = {
  keys: [{ threshold: matchSorter.rankings.STARTS_WITH, key: "name" }],
};

export const useInventoryValuable = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [inventory, setInventory] = React.useState<FormatedValuableObject[]>();
  const { isLoading, data } = useSelector(getInventoryValuableObject);

  React.useEffect(() => {
    dispatch(fetchInventorByUserId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      setInventory(data);
    }
  }, [isLoading, data]);

  React.useEffect(() => {
    const match = matchSorter(data, searchQuery, searchConfig);

    setInventory(match.sort((a, b) => a.rank - b.rank));
  }, [data, searchQuery, setInventory]);

  return {
    inventory,
    setInventory,
    isLoading,
    data,
    setSearchQuery,
    searchQuery,
  };
};
