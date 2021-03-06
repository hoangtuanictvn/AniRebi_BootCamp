import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Row, Col, Carousel, Button, Icon } from "antd";
import CoverImage from "../assets/images/cover_placeholder.jpg";
import SmallCoverImage from "../assets/images/small_cover_placeholder.jpg";
import BannerImage from "../assets/images/banner_placeholder.jpg";
import styled from "styled-components";
import CardBox from "../components/CardBox/CardBox";
import BGImage from "../assets/images/background_home.png";
import CustomHorizontalList from "../components/CustomHorizontalList/CustomHorizontalList";
import CustomVerticalList from "../components/CustomVerticalList/CustomVerticalList";
import PropTypes from "prop-types";

const { Content } = Layout;

class HomePage extends Component {
  static propTypes = {
    topAnimeData: PropTypes.array.isRequired,
    genresListData: PropTypes.array.isRequired,
    genreTopData: PropTypes.object.isRequired,
    multipleGenreTopData: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.recentlyReviewedRef = React.createRef();
  }

  handleNextBtnClick = e => {
    this.recentlyReviewedRef.current.next();
  };

  handlePrevBtnClick = e => {
    this.recentlyReviewedRef.current.prev();
  };

  handleBannerError = e => {
    e.target.src = "https://image.ibb.co/hnycB9/placeholder_large.png";
  };

  render() {
    const FilteredBannerData = this.props.topAnimeData.filter(
      item => item.banner != null
    );
    const BannerImages = FilteredBannerData.map(item => (
      <StyledImg
        key={item.id}
        src={item.banner}
        onError={this.handleBannerError}
      />
    ));

    const TopGenreCardBoxes = this.props.multipleGenreTopData.map(item => (
      <div key={item.genre.id}>
        <CardBox
          key={item.genre.id}
          title={item.genre.name}
          content={<CustomHorizontalList dataSource={item.animes} />}
        />
        &nbsp;
      </div>
    ));

    const SlicedTopAnimeData1 = this.props.topAnimeData.slice(0, 7);
    const SlicedTopAnimeData2 = this.props.topAnimeData.slice(7, 15);

    return (
      <StyledContent className="HomePageContent">
        <Row>
          <Carousel style={{ width: "100%" }} autoplay={true}>
            {BannerImages}
          </Carousel>
        </Row>
        &nbsp;
        <Content style={{ padding: "0px 100px 50px" }}>
          <CardBox
            title="Recently Reviewed"
            content={
              <Row type="flex" justify="center" align="middle">
                <PrevCarouselNavButton
                  size="large"
                  type="default"
                  onClick={this.handlePrevBtnClick}
                >
                  <Icon type="left" />
                </PrevCarouselNavButton>
                <Col span={24}>
                  <Carousel ref={this.recentlyReviewedRef} dots={false}>
                    <CustomHorizontalList dataSource={SlicedTopAnimeData1} />
                    <CustomHorizontalList dataSource={SlicedTopAnimeData2} />
                  </Carousel>
                </Col>
                <NextCarouselNavButton
                  size="large"
                  type="default"
                  onClick={this.handleNextBtnClick}
                >
                  <Icon type="right" />
                </NextCarouselNavButton>
              </Row>
            }
          />
          &nbsp;
          <Row>
            <Col span={17}>{TopGenreCardBoxes}</Col>
            <Col span={6} offset={1}>
              <CardBox
                title="Ranking"
                content={
                  <CustomVerticalList dataSource={this.props.topAnimeData} />
                }
              />
            </Col>
          </Row>
        </Content>
      </StyledContent>
    );
  }
}

const mapStateToProps = state => {
  return {
    topAnimeData: state.anime.topAnimeData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData,
    multipleGenreTopData: state.anime.multipleGenreTopData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const StyledImg = styled.img`
  width: 100%;
  height: calc(31vw);
  color: white;
  text-align: center;
  object-fit: cover;
`;

const StyledContent = styled(Content)`
  background-image: url(${BGImage});
`;

const PrevCarouselNavButton = styled(Button)`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  left: 0;
  z-index: 1;
  border: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  &:focus,
  :hover {
    background: rgba(255, 255, 255, 0.8);
    color: black;
  }
`;

const NextCarouselNavButton = styled(Button)`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  right: 0;
  z-index: 1;
  border: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  &:focus,
  :hover {
    background: rgba(255, 255, 255, 0.8);
    color: black;
  }
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
