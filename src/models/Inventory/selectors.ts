import { createSelector } from "@reduxjs/toolkit";
import { format } from "date-fns";

import { AppState } from "../rootReducer";

import { FormatedValuableObject, ValuableObject } from "./slices";

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

export const getSuccessNotification = createSelector(
  (state: AppState) =>
    state.inventory.notifications.filter(
      (notification) => notification.type === "SUCCESS"
    ),
  (notifications) => ({
    showModal: notifications.length > 0,
    data: notifications[0],
  })
);
