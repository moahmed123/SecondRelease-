import { StyleSheet } from 'react-native';

const bulletSize = 7;

const styles = StyleSheet.create({
  horizontalScroll: {
    position: 'absolute',
  },
  pageInfoBottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  pageInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pageInfoPill: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageInfoText: {
    textAlign: 'center',
  },
  bullets: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
    height: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  arrows: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  arrowsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chosenBullet: {
    margin: 10,
    width: bulletSize,
    height: bulletSize,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bullet: {
    margin: 10,
    width: bulletSize,
    height: bulletSize,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
    opacity: 0.15,
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default styles;
