import React from "react";
import HomePresenter from "./HomePresenter";
import { movieAPI } from "../../api";

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
          const {
            data: { results: nowPlaying }
          } = await movieAPI.nowPlaying();
          const {
            data: { results: upcoming }
          } = await movieAPI.upcoming();
          const {
            data: { results: popular }
          } = await movieAPI.popular();
          this.setState({
            nowPlaying,
            upcoming,
            popular
          });
        } catch {
          this.setState({
            error: "Can't find movie information."
          });
        } finally {
          this.setState({
            loading: false
          });
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;

        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }
}