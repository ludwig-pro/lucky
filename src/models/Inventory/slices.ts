import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import * as API from "../../services/fetcher";

export type Category = "Art" | "Electronics" | "Jewelry" | "Music Instruments";

export interface ValuableObject {
  id: string;
  rank: number;
  name: string;
  category: Category;
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

interface SuccessNotification {
  type: "SUCCESS";
  name: string;
  estimation: string;
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
  initialState: {
    ...valuableObjectAdapter.getInitialState(),
    notifications: [] as SuccessNotification[],
  },
  reducers: {
    addValuableObject(state, action: PayloadAction<ValuableObject>) {
      valuableObjectAdapter.addOne(state, action.payload);
      state.notifications.push({
        type: "SUCCESS",
        name: action.payload.name,
        estimation: "12000",
      });
    },
    removeNotification(state) {
      state.notifications.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInventorByUserId.fulfilled, (state, action) => {
      valuableObjectAdapter.addMany(state, action.payload);
    });
  },
});

export const { addValuableObject, removeNotification } = inventorySlice.actions;

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

export default inventorySlice.reducer;
