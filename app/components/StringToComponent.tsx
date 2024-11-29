import React, { PureComponent } from "react";
import RN, { View } from "react-native";

function mapStringToComponent(stringToRender) {
  const parseResult = stringToRender.match(/<([a-z]*)>(.*)<\/[a-z]*>/i);
  // result of this regex ["<Text>hello</Text>", "Text", "hello"]

  if (parseResult !== null) {
    const [, compName, innerText] = parseResult;

    return React.createElement(
      RN[compName],
      null, // here may be an object with attributes if your node has any
      innerText
    );
  }

  return null;
}

export { mapStringToComponent };
