/********************************************************************************
* BTI425 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Punya Pratishtha Kalia Student ID: 181480211 Date: 2026.04.12
*
********************************************************************************/

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <>
        <PageHeader
          text="Nothing Here"
          subtext="Add a book to your favourites to see it here"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <Container>
        <Row className="gy-4">
          {favouritesList.map((workId) => (
            <Col key={workId} lg={3} md={6}>
              <BookCard workId={workId} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}