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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  // Build the query string from all router.query params
  let queryString = { ...router.query };
  let qParts = [];
  Object.entries(queryString).forEach(([key, value]) => {
    if (key !== "page") qParts.push(`${key}:${value}`);
  });
  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  } else {
    queryString = "";
  }

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) {
      setPageData(data.docs);
    }
  }, [data]);

  // Reset to page 1 when query changes
  useEffect(() => {
    setPage(1);
  }, [router.query]);

  // Build a readable subtext from the query params
  const subtextParts = Object.keys(router.query).map(
    (key) => `${key}: ${router.query[key]}`
  );
  const subtext = subtextParts.length > 0 ? subtextParts.join(" | ") : "";

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    setPage(page + 1);
  }

  if (error) return <p>Failed to load books.</p>;

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      <Container>
        {!queryString && (
          <p className="text-muted">
            No search parameters provided. Go back and search for a book.
          </p>
        )}

        {queryString && (
          <>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((book) => (
                  <tr
                    key={book.key}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/works/${book.key.split("/").pop()}`)
                    }
                  >
                    <td>{book.title}</td>
                    <td>
                      {book.first_publish_year
                        ? book.first_publish_year
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              <Pagination.Prev onClick={previous} disabled={page === 1} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next
                onClick={next}
                disabled={!data || pageData.length < 10}
              />
            </Pagination>
          </>
        )}
      </Container>
    </>
  );
}