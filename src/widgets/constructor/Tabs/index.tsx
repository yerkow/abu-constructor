import { IWidgetProps } from "@/shared/types";
import { TabsClient } from "./TabsClient";

function Tabs(props: IWidgetProps) {
    return <TabsClient {...props} />
}

Tabs.displayName = "Tabs";
export default Tabs;