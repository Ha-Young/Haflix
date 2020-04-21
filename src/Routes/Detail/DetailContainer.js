import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieAPI, tvAPI } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
    console.log("construct");
    console.log(this.state);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const regNumber = /^[0-9]*$/;
    if (!regNumber.test(id)) {
      return push("/");
    }

    let result = null;
    try {
      if (isMovie) {
        ({data: result} = await movieAPI.detail(id));
      } else {
        ({data: result} = await tvAPI.detail(id));
      }
      console.log(result);
    }catch {
      this.setState({error: "Can't find anything"});
    }finally {
      this.setState({result, loading: false})
    }
  }

  render() {
    const { result, error, loading } = this.state;
    console.log(this.state);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
