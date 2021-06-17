import useSWR from "swr";

const fetchar = () => fetch("https://trello.com/1/members/aiiver/boards?key="+process.env.NEXT_PUBLIC_KEY+"&token="+process.env.NEXT_PUBLIC_TOKEN+"&fields=name");

export function TrelloCard() {
  const { data, error } = useSWR("https://trello.com/1/members/aiiver/boards?key="+process.env.NEXT_PUBLIC_KEY+"&token="+process.env.NEXT_PUBLIC_TOKEN+"&fields=name", fetchar);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>trelloだよ</div>;
}
