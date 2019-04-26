import React, { Fragment } from 'react';
import ReviewList from './ReviewList.jsx'
import RatingSummary from './RatingSummary.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: 1,
      reviews: [],
      origReviews: [],
      reviewsFiltered: false,
      filterScore: '',
    };
    this.handleChartClick.bind(this);
  }

  componentDidMount() {
    const splitUrl = window.location.pathname.split('/');
    const rId = Number.parseInt(splitUrl[splitUrl.length - 1]) ||  Number.parseInt(splitUrl[splitUrl.length - 2]);
    this.setState({
      restaurantId: rId,
    }, this.getReviews);
  }

  getReviews() {
    const { restaurantId } = this.state;
    fetch(`/api/restaurants/${restaurantId}/reviews`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          reviews: data,
          origReviews: data,
        });
      })
      .catch(err => console.error('Error fetching data: ' + err));
  }

  handleChartClick(e, clickScore) {
    const {reviewsFiltered, origReviews, filterScore } = this.state;
    e.preventDefault();
    if (reviewsFiltered) {
      if (clickScore === filterScore) {
        this.setState({
          reviews: origReviews,
          reviewsFiltered: false,
        });
      } else {
        this.setState({
          reviews: origReviews.filter(rev => rev.overall_score === clickScore),
          filterScore: clickScore,
        });
      }
    } else {
      this.setState({
        reviews: origReviews.filter(rev => rev.overall_score === clickScore),
        reviewsFiltered: true,
        filterScore: clickScore,
      });
    }
  }

  render() {
    const { reviews, origReviews } = this.state;
    return (
      <Fragment>
        <RatingSummary
          reviews={reviews}
          origReviews={origReviews}
          handleChartClick={this.handleChartClick}
        />
        <ReviewList reviews={reviews} />
      </Fragment>
    );
  }
}

export default App;
