import React from "react";
import {
  Card,
  CardImg,
  CardText,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentFormComponent";
function RenderDish({ dish }) {
  return (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardText className="p-2 font-weight-bold">{dish.name}</CardText>
        <CardText className="p-2">{dish.description}</CardText>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  const commentSection = comments.map((comment) => {
    return (
      <ListGroupItem key={comment.id}>
        {comment.comment} <br></br> {comment.author}{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(Date.parse(comment.date)))}
      </ListGroupItem>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ListGroup>{commentSection}</ListGroup>
      <CommentForm />
    </div>
  );
}
const DishDetail = (props) => {
  if (props.dish == null) {
    return <div></div>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
};

export default DishDetail;
