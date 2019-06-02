import React, { Component } from 'react';
import { MapView } from 'expo';
import styles from '../styles'


class Map extends Component {
  render() {

    const { location } = this.props.navigation.state.params

    return (
      <MapView
          style={styles.container}
          initialRegion={{
                latitude: location.coords.lat,
                longitude: location.coords.lng,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
          }}>
        <MapView.Marker
            coordinate={{
                latitude: location.coords.lat,
                longitude: location.coords.lng,
            }}
            title={location.name}
            />
      </MapView>
    );
  }
}

export default Map

