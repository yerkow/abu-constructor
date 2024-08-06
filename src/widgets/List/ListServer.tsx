import { ListClient, ListProps } from "@/widgets/List/ListClient";

function List(props: ListProps) {
  return <ListClient {...props} />;
}
List.displayName = "List";

export default List;
