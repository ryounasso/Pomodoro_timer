import useSWR from "swr";

const fetchar = () => fetch("/api/user");

export function TrelloCard() {
  const { data, error } = useSWR("/api/user", fetchar);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>trelloだよ</div>;
}
