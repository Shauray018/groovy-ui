import { View, StyleSheet } from 'react-native';
// import { Button } from '../src/components/ui/Button';
import { Button } from './src/components/ui';

export default function Index() {
  return (
    <View style={styles.container}>
      <Button 
        title="Primary Button" 
        onPress={() => alert('Clicked!')}
        variant="primary"
      />
      
      <Button 
        title="Secondary Button" 
        onPress={() => alert('Clicked!')}
        variant="secondary"
      />
      
      <Button 
        title="Outline Button" 
        onPress={() => alert('Clicked!')}
        variant="outline"
      />
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
  },
});