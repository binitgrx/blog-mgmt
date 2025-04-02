import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { instance } from "../../utils/axios";
import { URLS } from "../../constants";
import { addBookmark } from "../../slices/bookmarkSlice";
import { dateFormatter } from "../../utils/dateFormatter";

import SkeletalLoading from "../../components/SkeletalLoading";

const Blog = () => {
  const { slug } = useParams();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const getBlogBySlug = (slug) => {
    return instance.get(`${URLS.BLOGS}/${slug}`);
  };

  const { data, isPending } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            {isPending ? (
              <SkeletalLoading />
            ) : (
              <Card.Body>
                <h1 className="text-center">{data?.data?.data?.title}</h1>
                <div className="d-flex justify-content-between">
                  <p className="text-muted text-center">
                    By {data?.data?.data?.author?.name} | &nbsp;
                    {dateFormatter(data?.data?.data?.createdAt)}
                  </p>
                  <div
                    onClick={() => dispatch(addBookmark(data?.data?.data))}
                    style={{ cursor: "pointer" }}
                  >
                    {bookmarks.some(
                      (item) => item.slug === data?.data?.data.slug
                    ) ? (
                      <BsHeartFill color="red" fill="red" size={24} />
                    ) : (
                      <BsHeart size={24} />
                    )}
                  </div>
                </div>

                {data?.data?.data?.image && (
                  <Image
                    src={data?.data?.data?.image}
                    fluid
                    className="mb-4"
                    alt={data?.data?.data?.title}
                  />
                )}

                <p>{data?.data?.data?.content}</p>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
