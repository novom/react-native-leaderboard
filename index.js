import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ListView,
  ViewPropTypes,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const oddRowColor = 'white';
const evenRowColor = 'white';

export default class Leaderboard extends Component {
  state = {
    sortedData: []
  };

  static propTypes = {
    ...ViewPropTypes,
    //required
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    sortBy: PropTypes.string.isRequired,
    labelBy: PropTypes.string.isRequired,

    //optional
    sort: PropTypes.func,
    icon: PropTypes.string,
    onRowPress: PropTypes.func,
    renderItem: PropTypes.func,
    containerStyle: PropTypes.object,
    scoreStyle: PropTypes.object,
    rankStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    avatarStyle: PropTypes.object,
    oddRowColor: PropTypes.string,
    evenRowColor: PropTypes.string
  };

  sort = data => {
    const sortBy = this.props.sortBy;

    let sorted = [];
    if (this.props.sort) {
      return this.props.sort(data);
    } else if (typeof data === 'object') {
      let sortedKeys =
        data &&
        Object.keys(data).sort((key1, key2) => {
          return data[key2][sortBy] - data[key1][sortBy];
        });
      return (
        sortedKeys &&
        sortedKeys.map(key => {
          return data[key];
        })
      );
    } else if (typeof data === 'array') {
      return (
        data &&
        data.sort((item1, item2) => {
          return item2[sortBy] - item1[sortBy];
        })
      );
    }
  };

  defaultRenderItem = (item, index) => {
    const sortBy = this.props.sortBy;
    const evenColor = this.props.evenRowColor || evenRowColor;
    const oddColor = this.props.oddRowColor || oddRowColor;

    const rowColor = index % 2 === 0 ? evenColor : oddColor;

    const rowJSx = (
      <View style={[styles.row, { backgroundColor: rowColor }]} key={index}>
        <View style={styles.left}>
          <Text
            style={[
              styles.rank,
              this.props.rankStyle,
              index < 9 ? styles.singleDidget : styles.doubleDidget,
            ]}
          >
            {parseInt(index, 10) + 1}
          </Text>
          {this.props.icon && (
            <Image
              source={{ uri: item[this.props.icon] }}
              style={[styles.avatar, { borderColor: item.colorTeam }, this.props.avatarStyle]}
            />
          )}
          <Text style={[styles.label, this.props.labelStyle]} numberOfLines={1}>
            {item[this.props.labelBy]}
          </Text>
        </View>
        <Text style={[styles.score, this.props.scoreStyle]}>
          {item[sortBy] ? `${item[sortBy]} pts` : '0 pts'}
        </Text>
      </View>
    );

    return this.props.onRowPress ? (
      <TouchableOpacity onPress={() => this.props.onRowPress(item, index)}>
        {rowJSx}
      </TouchableOpacity>
    ) : (
        rowJSx
      );
  };

  componentWillMount() {
    this.setState({ sortedData: this.sort(this.props.data) });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.data !== nextProps.data) {
      this.setState({ sortedData: this.sort(nextProps.data) });
    }
  };

  renderItem = (item, index) =>
    (
      this.props.renderItem
        ? this.props.renderItem(item, index)
        : this.defaultRenderItem(item, index)
    );


  render() {
    const dataSource = ds.cloneWithRows(this.state.sortedData);

    return (
      <ListView
        enableEmptySections
        style={this.props.containerStyle}
        dataSource={dataSource}
        renderRow={(data, someShit, i) => this.renderItem(data, i)}
      />
    );
  }
}
