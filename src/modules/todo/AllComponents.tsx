import { useAppTheme } from 'hooks';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const AllComponents = () => {
  const { colors } = useAppTheme();

  const primaryColorList = [
    {
      backgroundColor: colors.primary,
      text: 'Primary',
    },

    {
      backgroundColor: colors.primaryContainer,
      text: 'Primary Container',
      textColor: colors.secondary,
    },

    {
      backgroundColor: colors.onPrimary,
      text: 'On Primary',
    },

    {
      backgroundColor: colors.onPrimaryContainer,
      text: 'On Primary Container',
    },

    {
      backgroundColor: colors.inversePrimary,
      text: 'Inverse Primary',
    },
  ];

  const secondaryColorList = [
    {
      backgroundColor: colors.secondary,
      text: 'Secondary',
    },

    {
      backgroundColor: colors.secondaryContainer,
      text: 'Secondary Container',
      textColor: colors.primary,
    },

    {
      backgroundColor: colors.onSecondary,
      text: 'On Secondary',
      textColor: colors.secondary,
    },

    {
      backgroundColor: colors.onSecondaryContainer,
      text: 'On Secondary Container',
      textColor: colors.secondaryContainer,
    },

    {
      backgroundColor: colors.tertiary,
      text: 'Tertiary',
    },

    {
      backgroundColor: colors.tertiaryContainer,
      text: 'Tertiary Container',
    },
  ];

  const elevationColorList = [
    {
      backgroundColor: colors.elevation.level0,
      text: 'Elevation Lv 0',
    },
    {
      backgroundColor: colors.elevation.level1,
      text: 'Elevation Lv 1',
    },
    {
      backgroundColor: colors.elevation.level2,
      text: 'Elevation Lv 2',
    },
    {
      backgroundColor: colors.elevation.level3,
      text: 'Elevation Lv 3',
    },
    {
      backgroundColor: colors.elevation.level4,
      text: 'Elevation Lv 4',
    },
    {
      backgroundColor: colors.elevation.level5,
      text: 'Elevation Lv 5',
    },
  ];

  const surfaceColorList = [
    {
      backgroundColor: colors.surface,
      text: 'Surface',
    },

    {
      backgroundColor: colors.surfaceVariant,
      text: 'Surface Variant',
    },

    {
      backgroundColor: colors.surfaceDisabled,
      text: 'Disabled Surface',
    },

    {
      backgroundColor: colors.onSurface,
      text: 'On Surface',
      textColor: colors.surface,
    },

    {
      backgroundColor: colors.onSurfaceVariant,
      text: 'On Surface Variant',
      textColor: colors.surfaceVariant,
    },

    {
      backgroundColor: colors.onSurfaceDisabled,
      text: 'Disabled On Surface',
    },

    {
      backgroundColor: colors.inverseSurface,
      text: 'Inverse Surface',
      textColor: colors.inverseOnSurface,
    },

    {
      backgroundColor: colors.inverseOnSurface,
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
