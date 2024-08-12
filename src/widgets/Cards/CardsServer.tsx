import { IWidget } from "@/app/[locale]/[...slug]/page";
import {
    CardsClient,
} from "@/widgets/Cards/CardsClient";
function Cards(props: Pick<IWidget, "options" | "contents">) {
    return <CardsClient {...props} />;
}


Cards.displayName = "Cards";
export default Cards;
