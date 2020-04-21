import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmets from "react-helmet";
import Ratings from "react-ratings-declarative";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Imdb = styled.a`
  display: inline-block;
  position: relative;
  top: 4px;
  width: 26px;
  height: 16px;
  border-radius: 2px;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;
`;

const ProductCompanies = styled.div`
  margin-top: 20px;
  width: auto;
  height: 50px;
  display: flex;
`;

const ProductCompany = styled.div`
  margin: 10px;
  width: 100px;
  height: 25px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
`;

const Countries = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
`;

const Country = styled.div`
  height: 20px;
  margin-right: 5px;
  opacity: 0.7;
  font-size: 18px;
`;

const Videos = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 40%;
  float: left;
`;

const Video = styled.iframe`
  width: 320px;
  height: 240px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #000;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmets>
        <title>Loading | Haflix</title>
      </Helmets>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmets>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Haflix
        </title>
      </Helmets>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            {result.imdb_id && (
              <Item>
                <Imdb
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target={"_blank"}
                  src={require("../../assets/imdb.png")}
                />
              </Item>
            )}
            <Divider>•</Divider>
            {result.vote_average && parseFloat(result.vote_average) / 2 > 0 ? (
              <Item>
                <Ratings rating={parseFloat(result.vote_average) / 2}>
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                </Ratings>
              </Item>
            ) : (
              "No Data"
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>

          <ProductCompanies>
          {!result.production_companies &&
          result.production_companies[0].logo_path === null
            ? result.networks.map(
                (network, index) =>
                  index < 4 && (
                    <ProductCompany
                      key={network.id}
                      bgImage={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                    />
                  )
              )
            : result.production_companies.map(
                (company, index) =>
                  index < 4 && (
                    <ProductCompany
                      key={company.id}
                      bgImage={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                    />
                  )
              )}
          </ProductCompanies>
          

          {result.production_countries && (
            <Countries>
              {result.production_countries.map((country) => (
                <Country>
                  <span role="img" aria-label={country.name}>
                    🇺🇸
                  </span>
                  {country.name}
                </Country>
              ))}
            </Countries>
          )}

          {result.videos && (
            <Videos>
              {result.videos.results.map(
                (video, index) =>
                  index <= 1 && (
                    <Video
                      key={video.id}
                      src={`https://www.youtube.com/embed/${video.key}`}
                    />
                  )
              )}
            </Videos>
          )}
        </Data>
      </Content>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
