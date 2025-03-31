import { Container, Button, Row, Col, Card } from "react-bootstrap";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="app">
        <section className="hero-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="pe-lg-5">
                <h1 className="display-4 fw-bold mb-3">
                  Mundana is an HTML Bootstrap Template for Professional
                  Blogging
                </h1>
                <p className="lead text-muted mb-4">
                  Beautifully crafted with the latest technologies, SASS &
                  Bootstrap 4.1.3, Mundana is the perfect design for your
                  professional blog. Homepage, post article and category layouts
                  available.
                </p>
                <Button variant="dark" className="px-4 rounded-1">
                  Read More
                </Button>
              </Col>
              <Col lg={6}>
                <img
                  src="https://picsum.photos/800/600"
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
              <Card className="border-0 mb-5">
                <Card.Img
                  variant="top"
                  src="https://picsum.photos/800/400"
                  className="rounded"
                />
                <Card.Body className="px-0">
                  <div className="mb-1">
                    <small className="text-muted">
                      Favid Rick · Dec 12 · 5 min read
                    </small>
                  </div>
                  <h2 className="h3 fw-bold">
                    Brain Stimulation Relieves Depression Symptoms
                  </h2>
                  <p className="text-muted">
                    Researchers have found an effective target in the brain for
                    electrical stimulation to improve mood in people suffering
                    from depression.
                  </p>
                </Card.Body>
              </Card>

              <h5 className="mb-4">All Stories</h5>

              {[
                "Nearly 200 Great Barrier Reef coral species also live in the deep sea",
                "East Antarcticas glaciers are stirring",
                "50 years ago, armadillos hinted that DNA wasnt destiny",
              ].map((title, idx) => (
                <article key={idx} className="mb-4">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h2 className="h5 fw-bold mb-1">{title}</h2>
                      <p className="text-muted mb-2">
                        There are more coral species lurking in the deep ocean
                        than previously thought.
                      </p>
                      <small className="text-muted">
                        Jake Bittle in SCIENCE · Dec 12 · 5 min read
                      </small>
                    </Col>
                    <Col md={4}>
                      <img
                        src={`https://picsum.photos/400/300?random=${idx}`}
                        alt={title}
                        className="img-fluid rounded"
                      />
                    </Col>
                  </Row>
                </article>
              ))}
            </Col>

            <Col lg={4}>
              <div className="ps-lg-4">
                <h5 className="mb-4">Popular</h5>
                {[
                  "Did Supernovae Kill Off Large Ocean Animals?",
                  "Humans Reversing Climate Clock: 50 Million Years",
                  "Unprecedented Views of the Birth of Planets",
                  "Effective New Target for Mood-Boosting Brain Stimulation Found",
                ].map((title, idx) => (
                  <div key={idx} className="d-flex mb-4">
                    <span className="display-4 opacity-25 me-3 fw-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h6 className="mb-1 fw-bold">{title}</h6>
                      <small className="text-muted">
                        Jake Bittle in SCIENCE
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
