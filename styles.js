import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    marginTop: 1,
    padding: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 17,
    marginRight: 5,
  },
  singleDidget: {
    paddingLeft: 16,
    paddingRight: 6,
  },
  doubleDidget: {
    paddingLeft: 10,
    paddingRight: 2,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 80,
  },
  score: {
    fontSize: 20,
    position: 'absolute',
    right: 15,
    paddingLeft: 15,
  },
  avatar: {
    height: 37,
    width: 37,
    borderRadius: 37 / 2,
    marginRight: 10,
    borderWidth: 2,
  },
});

export default styles;
