import { THEME } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const AllComponents = () => {
  const primaryColorList = [
    {
      backgroundColor: THEME.colors.primary,
      text: 'Primary',
    },

    {
      backgroundColor: THEME.colors.primaryContainer,
      text: 'Primary Container',
    },

    {
      backgroundColor: THEME.colors.onPrimary,
      text: 'On Primary',
    },

    {
      backgroundColor: THEME.colors.onPrimaryContainer,
      text: 'On Primary Container',
    },

    {
      backgroundColor: THEME.colors.inversePrimary,
      text: 'Inverse Primary',
    },
  ];

  const secondaryColorList = [
    {
      backgroundColor: THEME.colors.secondary,
      text: 'Secondary',
    },

    {
      backgroundColor: THEME.colors.secondaryContainer,
      text: 'Secondary Container',
    },

    {
      backgroundColor: THEME.colors.onSecondary,
      text: 'On Secondary',
      textColor: 'white',
    },

    {
      backgroundColor: THEME.colors.onSecondaryContainer,
      text: 'On Secondary Container',
      textColor: 'white',
    },

    {
      backgroundColor: THEME.colors.tertiary,
      text: 'Tertiary',
    },

    {
      backgroundColor: THEME.colors.tertiaryContainer,
      text: 'Tertiary Container',
    },
  ];

  const elevationColorList = [
    {
      backgroundColor: THEME.colors.elevation.level0,
      text: 'Elevation Lv 0',
    },
    {
      backgroundColor: THEME.colors.elevation.level1,
      text: 'Elevation Lv 1',
    },
    {
      backgroundColor: THEME.colors.elevation.level2,
      text: 'Elevation Lv 2',
    },
    {
      backgroundColor: THEME.colors.elevation.level3,
      text: 'Elevation Lv 3',
    },
    {
      backgroundColor: THEME.colors.elevation.level4,
      text: 'Elevation Lv 4',
    },
    {
      backgroundColor: THEME.colors.elevation.level5,
      text: 'Elevation Lv 5',
    },
  ];

  const surfaceColorList = [
    {
      backgroundColor: THEME.colors.surface,
      text: 'Surface',
    },

    {
      backgroundColor: THEME.colors.surfaceVariant,
      text: 'Surface Variant',
    },

    {
      backgroundColor: THEME.colors.surfaceDisabled,
      text: 'Disabled Surface',
    },

    {
      backgroundColor: THEME.colors.onSurface,
      text: 'On Surface',
      textColor: 'white',
    },

    {
      backgroundColor: THEME.colors.onSurfaceVariant,
      text: 'On Surface Variant',
    },

    {
      backgroundColor: THEME.colors.onSurfaceDisabled,
      text: 'Disabled On Surface',
    },

    {
      backgroundColor: THEME.colors.inverseSurface,
      text: 'Inverse Surface',
      textColor: 'white',
    },

    {
      backgroundColor: THEME.colors.inverseOnSurface,
      text: 'Inverse On Surface',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Button mode="contained">Contained</Button>
        <Button mode="contained-tonal">Contained-tonal</Button>
        <Button mode="outlined">Outlined</Button>
        <Button mode="text">Text</Button>
        <Button mode="elevated">Elevated</Button>
      </View>

      <View style={styles.section}>
        {primaryColorList.map(({ backgroundColor, text }) => (
          <View style={[styles.surface, { backgroundColor }]}>{text}</View>
        ))}
      </View>

      <View style={styles.section}>
        {secondaryColorList.map(({ backgroundColor, text, textColor }) => (
          <View style={[styles.surface, { backgroundColor }]}>
            <Text style={{ color: textColor }}>{text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        {elevationColorList.map(({ backgroundColor, text }) => (
          <View style={[styles.surface, { backgroundColor }]}>{text}</View>
        ))}
      </View>

      <View style={styles.section}>
        {surfaceColorList.map(({ backgroundColor, text, textColor }) => (
          <View style={[styles.surface, { backgroundColor }]}>
            <Text style={{ color: textColor }}>{text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  section: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  surface: {
    width: 100,
    height: 50,
  },
});

export default AllComponents;
