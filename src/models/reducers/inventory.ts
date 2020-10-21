import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { format } from "date-fns";

import * as API from "../../services/fetcher";

import { AppState } from "./rootReducer";

export interface ValuableObject {
  id: string;
  rank: number;
  name: string;
  category: "Art" | "Electronics" | "Jewelry" | "Music Instruments";
  purchaseDate: string;
  purchaseValue: string;
  mainImage: string;
  receipt: string;
  image?: string;
  contractId: string;
  endOfWarranty?: string;
  estimation?: [string, string];
  description?: string;
}

export const fetchInventorByUserId = createAsyncThunk(
  "user/fetchInventory",
  async () => {
    const response = await API.fakeInventoryFetcher();
    return response.data;
  }
);

const valuableObjectAdapter = createEntityAdapter<ValuableObject>({
  selectId: (reference) => {
    return reference.id;
  },
  sortComparer: (a, b) => a.rank - b.rank,
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState: valuableObjectAdapter.getInitialState(),
  reducers: {
    addValuableObject: valuableObjectAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInventorByUserId.fulfilled, (state, action) => {
      valuableObjectAdapter.addMany(state, action.payload);
    });
  },
});

export const { addValuableObject } = inventorySlice.actions;

export type FormatedValuableObject = {
  id: ValuableObject["id"];
  rank: ValuableObject["rank"];
  category: ValuableObject["category"];
  purchaseDate: string;
  purchaseValue: ValuableObject["purchaseValue"];
  mainImage: ValuableObject["mainImage"];
  name: ValuableObject["name"];
  contractId: ValuableObject["contractId"];
  information: [string, string][];
  price: [string, string][];
  documents: [
    {
      id: 1;
      rank: 1;
      source: ValuableObject["receipt"];
    }
  ];
};

const formateValuableObject = (valuableObject?: ValuableObject) => {
  if (valuableObject === undefined) {
    return;
  }
  return {
    id: valuableObject.id,
    rank: valuableObject.rank,
    category: valuableObject.category,
    purchaseDate: format(new Date(valuableObject.purchaseDate), "dd/MM/yyyy"),
    purchaseValue: valuableObject.purchaseValue,
    mainImage: valuableObject.mainImage,
    name: valuableObject.name,
    contractId: valuableObject.contractId,
    information: [
      ["category", valuableObject.category],
      [
        "purchaseDate",
        format(new Date(valuableObject.purchaseDate), "dd/MM/yyyy"),
      ],
      [
        "endWarranty",
        (valuableObject.endOfWarranty &&
          format(new Date(valuableObject.endOfWarranty), "dd/MM/yyyy")) ||
          "-",
      ],
    ],
    price: [
      [
        "estimation",
        valuableObject.estimation
          ? `${valuableObject.estimation[0]} - ${valuableObject.estimation[1]}`
          : "-",
      ],
      ["purchasePrice", "5780"],
    ],
    documents: [
      {
        id: 1,
        rank: 1,
        source: valuableObject.receipt,
      },
    ],
  };
};

export const getInventoryValuableObject = createSelector(
  (state: AppState) => state.inventory.ids,
  (state: AppState) => state.inventory.entities,
  (ids, entities) => {
    const valuableObjects = ids.map((id) => {
      return entities[id];
    });

    const data = valuableObjects.map((valuableObject) =>
      formateValuableObject(valuableObject)
    );

    return {
      isLoading: valuableObjects.length === 0,
      data: data as FormatedValuableObject[],
    };
  }
);

export default inventorySlice.reducer;
