import { View, StyleSheet } from 'react-native';
import { StatefulButton } from './src/components/ui/StatefulButton';

export default function Index() {
  return (
    <View style={styles.container}>
      <StatefulButton
        onPress={() =>
          new Promise((resolve) => setTimeout(resolve, 4000))
        }
      >
        Send message
      </StatefulButton>
      hello
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
    backgroundColor:"#000000"
  },
});