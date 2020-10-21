import { ValuableObject } from "../models/reducers/inventory";

import { FAKE_DATA_INVENTORY } from "./fixtures";

export const fakeInventoryFetcher = async (): Promise<{
  data: ValuableObject[];
}> => {
  try {
    // sleep 1500
    await new Promise((res) => setTimeout(res, 1500));
    return { data: FAKE_DATA_INVENTORY };
  } catch (error) {
    return error;
  }
};
