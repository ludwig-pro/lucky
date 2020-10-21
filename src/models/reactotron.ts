/* eslint-disable prefer-destructuring */
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import { NativeModules } from "react-native";

let host;
try {
  const { scriptURL } = NativeModules.SourceCode;
  const address = scriptURL.split("://")[1].split("/")[0];
  host = address.split(":")[0];
  console.log("Host IP : ", host);
} catch {}

export default Reactotron.configure(
  host && {
    host,
  }
)
  .useReactNative()
  .use(reactotronRedux())
  .connect(); // add all built-in react native plugins
