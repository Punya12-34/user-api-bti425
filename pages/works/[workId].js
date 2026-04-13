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

import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading || !workId) return null;

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}