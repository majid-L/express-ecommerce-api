const formatNewReview = (body: Review & { [key: string]: any }): Review => {
  const newReview: Review = {
    customerId: body.customerId,
    productId: body.productId,
    title: body.title,
    body: body.body,
    rating: body.rating
  };

  if (body.recommend) {
    newReview.recommend = body.recommend
  }

  return newReview;
}

export default formatNewReview;