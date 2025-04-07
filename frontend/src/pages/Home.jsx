import { Container, Button, Row, Col, Card } from "react-bootstrap";
import "./Home.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import {
  listBlogs,
  setCurrentPage,
  setLimit,
} from "../slices/blogSlice";

import AlertBox from "../components/AlertBox";
import { TableLoading } from "../components/SkeletalLoading";
import Paginate from "../components/Paginate";
import ToastBox from "../components/Toast";
import ImageWithFallback from "../components/ImageWithFallback";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, currentPage, error, limit, loading, total } = useSelector(
    (state) => state.blogs
  );

  const handleCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const handleLimit = (num) => {
    dispatch(setLimit(num));
  };

  const initFetch = useCallback(() => {
    dispatch(listBlogs({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="app">
        <section className="hero-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="pe-lg-5">
                <h1 className="display-4 fw-bold mb-3">
                Manage and Discover Blogs with Ease
                </h1>
                <p className="lead text-muted mb-4">
                This powerful blog management platform lets you create, edit, publish, and explore a wide range of insightful blog posts. Whether you're an author or a reader, everything you need is right here.
                </p>
              </Col>
              <Col lg={6}>
                <img
                  src="https://picsum.photos/id/1/800/400"
                  alt="Hero"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <Container className="py-5">
          <Row>
            <Col lg={8}>
              {error && <ToastBox msg={error} />}
              {loading && blogs.length === 0 && (
                <TableLoading tableHeaders={["title", "Author", "Status"]} />
              )}
              {!loading && blogs.length === 0 && <AlertBox label="No blogs found." />}

              <h5 className="mb-4">Featured Blogs</h5>

              {!loading &&
                blogs.map((blog, idx) => (
                  <article key={blog._id} className="mb-4" onClick={() => navigate(`/blogs/${blog.slug}`)} style={{ cursor: "pointer" }}>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h2 className="h5 fw-bold mb-1">{blog.title}</h2>
                        <p className="text-muted mb-2">
                          {(blog.content || "").slice(0, 100)}...
                        </p>
                        <small className="text-muted">
                          {blog.author?.name} · {blog.readDuration || "5"} min read
                        </small>
                      </Col>
                      <Col md={4}>
                        <ImageWithFallback
                          src={blog.image || `https://picsum.photos/400/300?random=${idx}`}
                          alt={blog.title}
                          className="img-fluid rounded"
                        />
                      </Col>
                    </Row>
                  </article>
                ))}

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
