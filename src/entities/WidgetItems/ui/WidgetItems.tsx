import React from 'react'

interface IWidgetItemsProps {
    items: any;
    ItemComponent: any;
    writeChanges: any;
    deleteItem: any;
}

export const WidgetItems = ({ items, ItemComponent, writeChanges, deleteItem }: IWidgetItemsProps) => {
    return (
        <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
            {Object.keys(items).map((key, idx) => (
                <ItemComponent
                    writeChanges={writeChanges}
                    item={items[key]}
                    deleteCard={() => deleteItem(key)}
                    key={idx}
                    id={key}

                />
            ))}
        </section>
    )
}
