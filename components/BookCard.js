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

import useSWR from "swr";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (error || (data && !data.title)) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return (
      <Card>
        <Card.Img
          variant="top"
          src="https://placehold.co/400x600?text=Loading..."
        />
        <Card.Body>
          <Card.Title>Loading…</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{data?.title || ""}</Card.Title>
        <Card.Text className="text-muted">
          {data?.first_publish_date || "N/A"}
        </Card.Text>
        <Link href={`/works/${workId}`} className="btn btn-outline-primary mt-auto">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}