import React, { Component } from "react";
import {
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
class DishDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardText className="p-2 font-weight-bold">{dish.name}</CardText>
            <CardText className="p-2">{dish.description}</CardText>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  renderComments(comments) {
    const commentSection = comments.map((comment) => {
      return (
        <ListGroupItem key={comment.id}>
          {comment.comment} <br></br> {comment.author} {comment.date}
        </ListGroupItem>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ListGroup>{commentSection}</ListGroup>
      </div>
    );
  }
  render() {
    const dish = this.props.dishes;
    console.log(dish.comments[1]);
    return (
      <div className="container">
        <div className="row">
          {this.renderDish(dish)} {this.renderComments(dish.comments)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
