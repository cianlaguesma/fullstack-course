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
  //try to map this!
  renderComments(comments) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>

        <ListGroup>
          <ListGroupItem>
            {comments[0].comment} <br></br> {comments[0].author}{" "}
            {comments[0].date}
          </ListGroupItem>
          <ListGroupItem>
            {comments[1].comment} <br></br> {comments[1].author}{" "}
            {comments[1].date}
          </ListGroupItem>
          <ListGroupItem>
            {comments[2].comment} <br></br> {comments[2].author}{" "}
            {comments[2].date}
          </ListGroupItem>
          <ListGroupItem>
            {comments[3].comment} <br></br> {comments[3].author}{" "}
            {comments[3].date}
          </ListGroupItem>
          <ListGroupItem>
            {comments[4].comment} <br></br> {comments[4].author}{" "}
            {comments[4].date}
          </ListGroupItem>
        </ListGroup>
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
// return (
//       <div className="col-12 col-md-5 m-1">
//         <h4>Comments</h4>

//         <ListGroup>
//           <ListGroupItem>
//             {comments[0].comment} <br></br> {comments[0].author}{" "}
//             {comments[0].date}
//           </ListGroupItem>
//           <ListGroupItem>
//             {comments[1].comment} <br></br> {comments[1].author}{" "}
//             {comments[1].date}
//           </ListGroupItem>
//           <ListGroupItem>
//             {comments[2].comment} <br></br> {comments[2].author}{" "}
//             {comments[2].date}
//           </ListGroupItem>
//           <ListGroupItem>
//             {comments[3].comment} <br></br> {comments[3].author}{" "}
//             {comments[3].date}
//           </ListGroupItem>
//           <ListGroupItem>
//             {comments[4].comment} <br></br> {comments[4].author}{" "}
//             {comments[4].date}
//           </ListGroupItem>
//         </ListGroup>
//       </div>
//     );
