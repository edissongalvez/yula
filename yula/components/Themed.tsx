/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Alert, Image as DefaultImage, Platform, Pressable as DefaultButton, ScrollView as DefaultScrollView, StyleSheet, Text as DefaultText, TextInput as DefaultTextField, useColorScheme, View as DefaultView } from 'react-native'

import { Picker as DefaultPicker } from '@react-native-picker/picker' 

import Colors from '../constants/Colors'

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type ScrollViewProps = ThemeProps & DefaultScrollView['props']
export type TextFieldProps = ThemeProps & DefaultTextField['props']
export type ButtonProps = ThemeProps & React.ComponentProps<typeof DefaultButton>
export type PickerProps = ThemeProps & React.ComponentProps<typeof DefaultPicker>
export type PickerItemProps = ThemeProps & React.ComponentProps<typeof DefaultPicker.Item>

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const fontSize = 17

  return <DefaultText style={[{ color, fontSize }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSecondary')

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function Body({center, ...props}: ScrollViewProps & { center?: boolean }) {
  const { lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSecondary')

  return (
    <DefaultScrollView style={[{ backgroundColor }, styles.body]} contentContainerStyle={[styles.bodyContent, center ? { justifyContent: 'center', flex: 1 } : null]} { ...otherProps } />
  )
}

export function GroupedList({ children, header, footer, ...props }: ViewProps & { header?: string, footer?: string }) {
  const { lightColor, darkColor } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundTertiary')

  return (
    <DefaultView>
      { header && <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.groupedListHeader}>{header.toUpperCase()}</Text> }
      <DefaultView style={[{ backgroundColor }, styles.groupedListContent ]}>
        {children}
      </DefaultView>
      { footer && <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.groupedListFooter}>{footer}</Text> }
    </DefaultView>
  )
}

export function GroupedRow(
  props: { name: string, value: string }
) {
  return (
    <DefaultView style={styles.groupedRow}>
          <Text style={styles.groupedRowName} numberOfLines={1}>{props.name}</Text>
          <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.groupedRowValue} numberOfLines={1}>{props.value}</Text>
    </DefaultView>
  )
}


export function TextField({ title, ...props }: TextFieldProps & { title: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const placeholderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textTertiary')

  return (
    <DefaultView style={styles.textField}>
      <DefaultView style={styles.textFieldTitle}>
        <Text numberOfLines={1}>{title}</Text>
      </DefaultView>
      <DefaultTextField style={[{ color }, styles.textFieldValue, style]} placeholderTextColor={placeholderTextColor} {...otherProps} />
    </DefaultView> 
  )
}

export function Button({ action, secondary, tertiary, ...props }: ButtonProps & { action: string, secondary?: boolean, tertiary?: boolean }) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return (
    <DefaultButton style={[{ backgroundColor }, styles.button]} {...otherProps}>
      <DefaultText style={styles.buttonAction}>{action}</DefaultText>
    </DefaultButton>
  )
}

export function Picker({ title, ...props }: PickerProps & { title: string }) {
  const { lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return (
    <DefaultView style={styles.textField}>
      <DefaultView style={styles.textFieldTitle}>
        <Text numberOfLines={1}>{title}</Text>
      </DefaultView>
      <DefaultPicker style={[{ color }, styles.picker ]} {...otherProps} />
    </DefaultView>
  )
}

export function PickerItem({ label, value }: PickerItemProps & { label: string, value: any } ) {
  return <DefaultPicker.Item label={label} value={value} />
}

export function Separator(props: ViewProps) {
  const { lightColor, darkColor } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'separatorNonOpaque')

  return <DefaultView style={[{ backgroundColor }, styles.separator]}  />
}

export function Notify ( props: { title: string, desc: string }) {
  return (
    Platform.OS === 'web' ? window.alert(props.title + '\n' + props.desc) : Alert.alert(props.title, props.desc)
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
    
  },
  bodyContent: {
    padding: 16,
    gap: 16,
    maxWidth: 672,
    width: '100%',
    // flex: 1,
    alignSelf: 'center',
    marginVertical: 48
  },
  groupedListContent: {
    borderRadius: 10,
  },
  groupedListHeader: {
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 7
  },
  groupedListFooter: {
    fontSize: 13,
    paddingHorizontal: 16,
    marginTop: 5
  },
  textField: {
    height: 44,
    flexDirection: 'row',
  },
  textFieldTitle: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '27%'
  },
  textFieldValue: {
    paddingHorizontal: 16,
    fontSize: 17,
    flexGrow: 1
  },
  button: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  buttonAction: {
    color: 'white',
    fontSize: 17
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    // width: '80%',
  },
  picker: {
    backgroundColor: 'transparent',
    minHeight: 44,
    paddingHorizontal: 16,
    fontSize: 17,
    borderWidth: 0,
    flexGrow: 1
  },
  groupedRow: {
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  groupedRowName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '27%',

  }, 
  groupedRowValue: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'right'
  }
})
