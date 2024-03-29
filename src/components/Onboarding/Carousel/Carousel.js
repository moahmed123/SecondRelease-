import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ViewPropTypes,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import styles from "./styles";

const PAGE_CHANGE_DELAY = 4000;

// if ViewPropTypes is not defined fall back to View.propTypes (to support RN < 0.44)
const viewPropTypes = ViewPropTypes || View.propTypes;

/**
 * Animates pages in cycle
 * (loop possible if children count > 1).
 */

export default class Carousel extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    autoplay: PropTypes.bool,
    delay: PropTypes.number,
    currentPage: PropTypes.number,
    style: viewPropTypes.style,
    pageStyle: viewPropTypes.style,
    contentContainerStyle: viewPropTypes.style,
    pageInfo: PropTypes.bool,
    pageInfoBackgroundColor: PropTypes.string,
    pageInfoTextStyle: Text.propTypes.style,
    pageInfoBottomContainerStyle: viewPropTypes.style,
    pageInfoTextSeparator: PropTypes.string,
    bullets: PropTypes.bool,
    bulletsContainerStyle: Text.propTypes.style,
    bulletStyle: Text.propTypes.style,
    arrows: PropTypes.bool,
    arrowsContainerStyle: Text.propTypes.style,
    arrowStyle: Text.propTypes.style,
    leftArrowStyle: Text.propTypes.style,
    rightArrowStyle: Text.propTypes.style,
    leftArrowText: PropTypes.string,
    rightArrowText: PropTypes.string,
    chosenBulletStyle: Text.propTypes.style,
    onAnimateNextPage: PropTypes.func,
    onPageBeingChanged: PropTypes.func,
    swipe: PropTypes.bool,
    isLooped: PropTypes.bool
  };

  static defaultProps = {
    delay: PAGE_CHANGE_DELAY,
    autoplay: true,
    pageInfo: false,
    bullets: false,
    arrows: false,
    pageInfoBackgroundColor: "rgba(0, 0, 0, 0.25)",
    pageInfoTextSeparator: " / ",
    currentPage: 0,
    style: undefined,
    pageStyle: undefined,
    contentContainerStyle: undefined,
    pageInfoTextStyle: undefined,
    pageInfoBottomContainerStyle: undefined,
    bulletsContainerStyle: undefined,
    chosenBulletStyle: undefined,
    bulletStyle: undefined,
    arrowsContainerStyle: undefined,
    arrowStyle: undefined,
    leftArrowStyle: undefined,
    rightArrowStyle: undefined,
    leftArrowText: "",
    rightArrowText: "",
    onAnimateNextPage: undefined,
    onPageBeingChanged: undefined,
    swipe: true,
    isLooped: true
  };

  constructor(props) {
    super(props);
    const size = { width: 0, height: 0 };

    if (props.children) {
      const childrenLength = React.Children.count(props.children) || 1;

      this.state = {
        currentPage: props.currentPage,
        size,
        childrenLength
        // contents: null,
      };
    }
 else {
      this.state = { size };
    }

    this.offset = 0;
    this.nextPage = 0;
  }

  componentDidMount() {
    if (this.state.childrenLength) {
      this.setUpTimer();
    }
  }

  UNSAFE_componentWillReceiveProps({ children }) {
    if (!isEqual(this.props.children, children)) {
      const { currentPage } = this.state;

      this.clearTimer();
      let childrenLength = 0;

      if (children) {
        childrenLength = React.Children.count(children) || 1;
      }

      const nextPage =
        currentPage >= childrenLength ? childrenLength - 1 : currentPage;

      this.setState({ childrenLength }, () => {
        this.animateToPage(nextPage);
        this.setUpTimer();
      });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  getCurrentPage() {
    return this.state.currentPage;
  }

  setCurrentPage = currentPage => {
    this.setState({ currentPage }, () => {
      if (this.props.onAnimateNextPage) {
        this.props.onAnimateNextPage(currentPage);
      }
    });
  };

  onScrollBegin = () => {
    this.clearTimer();
  };

  onScrollEnd = event => {
    const offset = { ...event.nativeEvent.contentOffset };
    const page = this.calculateCurrentPage(offset.x);

    this.placeCritical(page);
    this.setCurrentPage(page);
    this.setUpTimer();
  };

  onScroll = event => {
    const { currentPage, childrenLength } = this.state;
    const currentOffset = event.nativeEvent.contentOffset.x;
    const direction = currentOffset > this.offset ? "right" : "left";

    this.offset = currentOffset;
    // alert(direction+' '+currentPage)

    if (direction === "right" && currentPage === childrenLength - 1) {
      // finished
    }

    const nextPage = this.calculateNextPage(direction);

    if (direction === "left" && currentPage === 0) {
      console.log("left");
    }
 else if (this.nextPage !== nextPage) {
      this.nextPage = nextPage;

      if (this.props.onPageBeingChanged) {
        this.props.onPageBeingChanged(this.nextPage);
      }
    }
  };

  onLayout = event => {
    const { height, width } = event.nativeEvent.layout;

    this.setState({ size: { width, height } });
    // remove setTimeout wrapper when https://github.com/facebook/react-native/issues/6849 is resolved.
    setTimeout(() => this.placeCritical(this.state.currentPage), 0);
  };

  setUpTimer = () => {
    // only for cycling
    if (this.props.autoplay && React.Children.count(this.props.children) > 1) {
      this.clearTimer();
      this.timer = setTimeout(this.animateNextPage, this.props.delay);
    }
  };

  setUpPages() {
    const { size } = this.state;
    const { children: propsChildren, isLooped, pageStyle } = this.props;
    const children = React.Children.toArray(propsChildren);
    const pages = [];

    if (children && children.length > 1) {
      // add all pages
      pages.push(...children);

      // We want to make infinite pages structure like this: 1-2-3-1-2
      // so we add first and second page again to the end
      if (isLooped) {
        // pages.push(children[0]);
        // pages.push(children[1]);
      }
    }
 else if (children) {
      // pages.push(children[0]);
    }
 else {
      // pages.push(children[0]);
      // pages.push(<View><Text>
      //     You are supposed to add children inside Carousel
      // </Text></View>);
    }

    pages.push(children[0]);

    // alert(pages.length)
    return pages.map((page, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <TouchableWithoutFeedback
        style={[{ ...size }, pageStyle]}
        key={`page${i}`}>
        {page}
      </TouchableWithoutFeedback>
    ));
  }

  calculateCurrentPage = offset => {
    const { width } = this.state.size;
    const page = Math.round(offset / width);

    return this.normalizePageNumber(page);
  };

  normalizePageNumber = page => {
    const { childrenLength } = this.state;

    if (page === childrenLength) {
      return 0;
      // eslint-disable-next-line no-else-return
    }
 else if (page > childrenLength) {
      return 1;
    }
 else if (page < 0) {
      return childrenLength - 1;
    }

    return page;
  };

  placeCritical = page => {
    const { isLooped } = this.props;
    const {
      childrenLength,
      size: { width }
    } = this.state;
    let offset = 0;

    // if page number is bigger then length - something is incorrect
    if (page < childrenLength) {
      if (page === 0 && isLooped) {
        // in "looped" scenario first page shold be placed after the last one
        offset = childrenLength * width;
      }
 else {
        offset = page * width;
      }
    }

    this.scrollTo({ offset, animated: false });
  };

  animatePreviousPage = () => {
    const { currentPage } = this.state;
    const nextPage = this.normalizePageNumber(currentPage - 1);

    // prevent from looping
    if (!this.props.isLooped && nextPage > currentPage) {
      return;
    }

    this.animateToPage(nextPage, "prev");
  };

  animateToPage = (page, direction) => {
    const {
      currentPage,
      childrenLength,
      size: { width }
    } = this.state;
    const { isLooped } = this.props;
    const nextPage = this.normalizePageNumber(page);

    this.clearTimer();

    // alert(direction)
    if (nextPage === currentPage) {
      // pass
    }
 else if (
      direction === "prev" &&
      (currentPage === 0 && nextPage === childrenLength - 1)
    ) {
      // pass
    }
 else if (nextPage === 0) {
      if (isLooped) {
        // animate properly based on direction
        if (currentPage !== childrenLength - 1) {
          this.scrollTo({
            offset: (childrenLength + 2) * width,
            animated: false,
            nofix: true
          });
        }

        this.scrollTo({ offset: childrenLength * width, animated: true });
      }
 else {
        this.scrollTo({ offset: 0, animated: true });
      }
    }
 else if (nextPage === 1) {
      // To properly animate from the first page we need to move view
      // to its original position first (not needed if not looped)
      if (currentPage === 0 && isLooped) {
        this.scrollTo({ offset: 0, animated: false, nofix: true });
      }

      this.scrollTo({ offset: width, animated: true });
    }
 else {
      // Last page is allowed to jump to the first through the "border"
      if (currentPage === 0 && nextPage !== childrenLength - 1) {
        this.scrollTo({ offset: 0, animated: false, nofix: true });
      }

      this.scrollTo({ offset: nextPage * width, animated: true });
    }

    this.setCurrentPage(nextPage);
    this.setUpTimer();
  };

  animateNextPage = () => {
    const { currentPage } = this.state;
    const nextPage = this.normalizePageNumber(currentPage + 1);

    // prevent from looping
    if (!this.props.isLooped && nextPage < currentPage) {
      return;
    }

    this.animateToPage(nextPage);
  };

  scrollTo = ({ offset, animated, nofix }) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: offset, animated });

      // Fix bug #50
      if (!nofix && Platform.OS === "android" && !animated) {
        this.scrollView.scrollTo({ y: 0, x: offset, animated: true });
      }
    }
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  calculateNextPage = direction => {
    const { width } = this.state.size;
    const ratio = this.offset / width;
    const page = direction === "right" ? Math.ceil(ratio) : Math.floor(ratio);

    return this.normalizePageNumber(page);
  };

  renderPageInfo = pageLength => (
    <View
      style={[
        styles.pageInfoBottomContainer,
        this.props.pageInfoBottomContainerStyle
      ]}
      pointerEvents='none'>
      <View style={styles.pageInfoContainer}>
        <View
          style={[
            styles.pageInfoPill,
            { backgroundColor: this.props.pageInfoBackgroundColor }
          ]}>
          <Text style={[styles.pageInfoText, this.props.pageInfoTextStyle]}>
            {`${this.state.currentPage + 1}${
              this.props.pageInfoTextSeparator
            }${pageLength}`}
          </Text>
        </View>
      </View>
    </View>
  );

  renderBullets = pageLength => {
    const bullets = [];

    for (let i = 0; i < pageLength; i += 1) {
      bullets.push(
        <TouchableWithoutFeedback
          onPress={() => this.animateToPage(i)}
          key={`bullet${i}`}>
          <View
            style={i === this.state.currentPage
                ? [styles.chosenBullet, this.props.chosenBulletStyle]
                : [styles.bullet, this.props.bulletStyle]}/>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View
        style={[styles.bullets, this.props.bulletsContainerStyle]}
        pointerEvents='box-none'>
        {bullets}
      </View>
    );
  };

  renderArrows = () => {
    let { currentPage } = this.state;
    const { childrenLength } = this.state;

    if (currentPage < 1) {
      currentPage = childrenLength;
    }

    return (
      <View style={styles.arrows} pointerEvents='box-none'>
        <View
          style={[styles.arrowsContainer, this.props.arrowsContainerStyle]}
          pointerEvents='box-none'>
          <TouchableOpacity
            onPress={this.animatePreviousPage}
            style={this.props.arrowStyle}>
            <Text style={this.props.leftArrowStyle}>
              {this.props.leftArrowText ? this.props.leftArrowText : "Left"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.animateNextPage}
            style={this.props.arrowStyle}>
            <Text style={this.props.rightArrowStyle}>
              {this.props.rightArrowText ? this.props.rightArrowText : "Right"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const contents = this.setUpPages();

    const containerProps = {
      onLayout: this.onLayout,
      style: [this.props.style]
    };

    const { size, childrenLength } = this.state;

    return (
      <View {...containerProps}>
        <ScrollView
          ref={c => {
            this.scrollView = c;
          }}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}
          onScroll={this.onScroll}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          contentInset={{ top: 0 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          bounces={false}
          scrollEnabled={this.props.swipe}
          contentContainerStyle={[
            styles.horizontalScroll,
            this.props.contentContainerStyle,
            {
              width:
                size.width *
                (childrenLength +
                  (childrenLength > 1 && this.props.isLooped ? 2 : 1)),
              height: size.height
            }
          ]}>
          {contents}
        </ScrollView>
        {this.props.arrows && this.renderArrows(this.state.childrenLength)}
        {this.props.bullets && this.renderBullets(this.state.childrenLength)}
        {this.props.pageInfo && this.renderPageInfo(this.state.childrenLength)}
      </View>
    );
  }
}
