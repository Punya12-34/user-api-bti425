/********************************************************************************
* BTI425 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Punya Pratishtha Kalia  Student ID: 181480211  Date: 2026/04/12
*
********************************************************************************/

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      ),
    });
  }

  return (
    <>
      <PageHeader
        text="Search"
        subtext="Find books from the Open Library catalogue"
      />

      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="mb-3">
            {/* Author */}
            <Col md={6}>
              <Form.Group controlId="author">
                <Form.Label>Author <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Jane Austen"
                  className={errors.author ? "is-invalid" : ""}
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <div className="invalid-feedback">{errors.author.message}</div>
                )}
              </Form.Group>
            </Col>

            {/* Title */}
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Pride and Prejudice"
                  {...register("title")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Subject */}
            <Col md={4}>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Fiction"
                  {...register("subject")}
                />
              </Form.Group>
            </Col>

            {/* Language */}
            <Col md={4}>
              <Form.Group controlId="language">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. eng"
                  {...register("language")}
                />
              </Form.Group>
            </Col>

            {/* First Publish Year */}
            <Col md={4}>
              <Form.Group controlId="first_publish_year">
                <Form.Label>First Publish Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 1813"
                  {...register("first_publish_year")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>
      </Container>
    </>
  );
}