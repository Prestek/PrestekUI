import { typography } from "@/assets/styles/theme";
import { Text, TextProps } from "react-native-paper";

export const AppText: React.FC<TextProps<any>> = (props) => {
    return (
      <Text
        {...props}
        style={[{ fontFamily: typography.fontFamily }, props.style]}
      />
    );
  }