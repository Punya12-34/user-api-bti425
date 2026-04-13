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

import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";
import { Card, Container } from "react-bootstrap";

const ABOUT_WORK_ID = "OL66554W";

export async function getStaticProps() {
  const url = `https://openlibrary.org/works/${ABOUT_WORK_ID}.json`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Fetch failed: ${res.status} ${res.statusText}\nURL: ${url}\n\n${text}`
    );
  }

  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader
        text="About the Developer"
        subtext="Punya Pratishtha Kalia"
      />

      <Container>
        <Card className="mb-4">
          <Card.Body>
            <p>
              Hi! My name is Punya Pratishtha Kalia, and I am a student with an
              interest in web development and user interface design. This
              application was built using Next.js and React to explore
              client-side data fetching and component-based design.
            </p>
            <p className="mb-0">
              The book featured below, <em>Pride and Prejudice</em> by Jane
              Austen, was selected from the Open Library API to demonstrate how
              classic literature can be accessed and displayed dynamically using
              external data sources.
            </p>
          </Card.Body>
        </Card>

        <BookDetails book={book} workId={ABOUT_WORK_ID} showFavouriteBtn={false} />
      </Container>
    </>
  );
}