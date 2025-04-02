import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";
import { instance } from "../../utils/axios";
import { URLS } from "../../constants";
import { blogDescription } from "../../utils/blogParser";
import { addBookmark } from "../../slices/bookmarkSlice";

import AlertBox from "../../components/AlertBox";
import ImageWithFallback from "../../components/ImageWithFallback";
import SkeletalLoading from "../../components/SkeletalLoading";
import Paginate from "../../components/Paginate";

const Blogs = () => {
  const navigate = useNavigate();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getBlogs = async ({ queryKey }) => {
    const [, { debounceSearch, page, limit }] = queryKey;
    return await instance.get(
      `${URLS.GET_PUBLISHED_BLOGS}?title=${debounceSearch}&page=${page}&limit=${limit}`
    );
  };
  const { data, isPending } = useQuery({
    queryKey: ["published-blogs", { debounceSearch, page, limit }],
    queryFn: getBlogs,
  });

  const handleCardClick = (slug) => navigate(`/blogs/${slug}`);

  return (
    <div>
      <Container className="my-5">
        <h1 className="mb-4">Blog Posts</h1>
        <Form className="mb-4">
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Row>{isPending && <SkeletalLoading />}</Row>
        <Row>
          {data?.data?.data?.data.length === 0 && (
            <AlertBox label="Blog not found" />
          )}
        </Row>
        <Row>
          {data?.data?.data?.data.length > 0 &&
            data?.data?.data?.data.map((post) => (
              <Col key={post._id} md={6} lg={3} className="mb-4">
                <div
                  onClick={() => handleCardClick(post.slug)}
                  style={{ cursor: "pointer" }}
                >
                  <Card>
                    <ImageWithFallback src={post.image} title={post.title} />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <Card.Title>{post.title}</Card.Title>
                        <div
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the click from triggering parent onClick
                            dispatch(addBookmark(post));
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {bookmarks.some((item) => item.slug === post.slug) ? (
                            <BsHeartFill color="red" fill="red" size={24} />
                          ) : (
                            <BsHeart size={24} />
                          )}
                        </div>
                      </div>
                      <Card.Text>
                        {post?.content &&
                          blogDescription({ content: post?.content })}
                      </Card.Text>
                      <div className="d-flex justify-content-between text-muted">
                        <small>{post.author.name}</small>
                        <small>{post.readDuration || "5"}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>

        <div className="d-flex justify-content-center">
          {data?.data?.data && data?.data?.data?.data.length > 0 && (
            <Paginate
              currentPage={data.data.data.page}
              limit={limit}
              total={data.data.data.total}
              setPage={setPage}
              setLimit={setLimit}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Blogs;
