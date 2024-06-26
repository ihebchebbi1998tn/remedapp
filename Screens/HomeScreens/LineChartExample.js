import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const dummyData = [
  { id: 7, name: "Olivia Davis", location: "San Antonio", distance: "8.0 km" },
  { id: 8, name: "Liam Miller", location: "San Diego", distance: "3.3 km" },
  { id: 9, name: "Mohamed Ben Salah", location: "Tunis", distance: "2.3 km" },
  { id: 10, name: "Amina Ben Youssef", location: "Sousse", distance: "5.1 km" },
  { id: 11, name: "Fares Gharbi", location: "Hammamet", distance: "3.8 km" },
  { id: 12, name: "Amira Karray", location: "Sfax", distance: "6.2 km" },
  { id: 13, name: "Youssef Khelifi", location: "Bizerte", distance: "4.5 km" },
  { id: 14, name: "Asma Ben Amor", location: "Nabeul", distance: "1.9 km" },
  { id: 15, name: "Mehdi Ben Othman", location: "Gabes", distance: "8.0 km" },
];

const extractDistances = data => data.map(item => parseFloat(item.distance));

const LineChartExample = () => {
  const distances = extractDistances(dummyData);
  const data = {
    labels: dummyData.map(item => item.location),
    datasets: [
      {
        data: distances,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distance by Location</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
          color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '1', stroke: '#ffa726' },
          propsForBackgroundLines: { stroke: '#ffffff' }
        }}
        bezier
        style={styles.chart}
        yAxisSuffix=" km"
        yAxisInterval={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default LineChartExample;
