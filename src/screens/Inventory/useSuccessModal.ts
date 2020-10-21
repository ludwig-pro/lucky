import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getSuccessNotification,
  removeNotification,
} from "../../models/Inventory";

const useSuccessModal = () => {
  const dispatch = useDispatch();
  const { showModal, data } = useSelector(getSuccessNotification);
  const [successModalVisible, setSuccessModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (showModal) {
      setSuccessModalVisible(true);
    }
  }, [showModal]);

  const handleSuccessModal = () => {
    setSuccessModalVisible((prevState) => !prevState);
    dispatch(removeNotification());
  };

  return { handleSuccessModal, successModalVisible, data };
};

export default useSuccessModal;
