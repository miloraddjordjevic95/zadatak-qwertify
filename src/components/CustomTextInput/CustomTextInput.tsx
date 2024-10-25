import { Dimensions, Platform, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { Controller } from "react-hook-form";
import { ICustomTextInputProps } from "@/interfaces";
import { COLORS } from "@/constants";

const { width } = Dimensions.get("window");

function CustomTextInput({
  showLabel,
  label,
  control,
  name,
  rules,
  autoCapitalize,
  autoComplete,
  autoFocus,
  editable,
  inputMode,
  keyboardType,
  multiline,
  placeholder,
  readOnly,
  secureTextEntry,
  textContentType,
}: ICustomTextInputProps): JSX.Element {
  const isDarkMode: boolean = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={isDarkMode ? styles.labelDarkMode : styles.labelLightMode}>{label}</Text>
        </View>
      )}
      <View>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <>
              <TextInput
                allowFontScaling={true}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                autoCorrect={true}
                autoFocus={autoFocus}
                blurOnSubmit={true}
                caretHidden={false}
                clearButtonMode="never"
                clearTextOnFocus={true}
                contextMenuHidden={false}
                dataDetectorTypes="none"
                disableFullscreenUI={false}
                editable={editable}
                enablesReturnKeyAutomatically={false}
                enterKeyHint="done"
                importantForAutofill="auto"
                inputMode={inputMode}
                keyboardAppearance="default"
                keyboardType={keyboardType}
                maxFontSizeMultiplier={null}
                multiline={multiline}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
                readOnly={readOnly}
                returnKeyType="done"
                rejectResponderTermination={true}
                scrollEnabled={true}
                secureTextEntry={secureTextEntry}
                selectTextOnFocus={true}
                spellCheck={true}
                textAlign="left"
                textContentType={textContentType}
                style={[
                  isDarkMode ? styles.textInputDarkMode : styles.textInputLightMode,
                  {
                    borderColor: error
                      ? "red"
                      : isDarkMode
                      ? COLORS.gray.background.darkMode
                      : COLORS.gray.background.lightMode,
                  },
                ]}
                textBreakStrategy="highQuality"
                value={value}
                lineBreakStrategyIOS="none"
              />
              {error && <Text style={{ color: "red", marginTop: 4 }}>{error.message || "Error"}</Text>}
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 8,
    width: "90%",
  },
  labelLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "left",
    color: COLORS.black,
  },
  labelDarkMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "left",
    color: COLORS.white,
  },
  textInputLightMode: {
    width: width / 1.2,
    backgroundColor: COLORS.gray.background.lightMode,
    color: COLORS.black,
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    borderColor: COLORS.gray.background.lightMode,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textInputDarkMode: {
    width: width / 1.2,
    backgroundColor: COLORS.gray.background.darkMode,
    color: COLORS.white,
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    borderColor: COLORS.gray.background.darkMode,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default CustomTextInput;
