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
      textColor: THEME.colors.secondary,
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
      textColor: THEME.colors.primary,
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
      textColor: 'white',
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

  const renderList = (list: { backgroundColor: string; text: string; textColor?: string }[]) => {
    return (
      <View style={styles.section}>
        {list.map(({ backgroundColor, text, textColor }) => (
          <View style={[styles.surface, { backgroundColor }]}>
            <Text style={[styles.surfaceText, { color: textColor }]}>{text}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Button mode="contained">Contained</Button>
        <Button mode="contained-tonal">Contained-tonal</Button>
        <Button mode="outlined">Outlined</Button>
        <Button mode="text">Text</Button>
        <Button mode="elevated">Elevated</Button>
      </View>

      {renderList(primaryColorList)}

      {renderList(secondaryColorList)}

      {renderList(elevationColorList)}

      {renderList(surfaceColorList)}
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
    width: 120,
    height: 50,
    borderRadius: 10,
    padding: 4,
    justifyContent: 'center',
  },

  surfaceText: {
    textAlign: 'center',
  },
});

export default AllComponents;
