import { Input } from '@/shared/ui';
import React from 'react'

export const EditFile = ({ image, writeChanges, setImage, id }: {
    image: string | ArrayBuffer | null,
    writeChanges: (id: string, field: string, value: any) => void,
    setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>,
    id: string
}) => {
    return (
        <>
            {image && <img className="w-20 h-20" src={image as string} alt="image" />}
            <Input
                type="file"
                label="Image"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        writeChanges(id, "image", file);
                        const reader = new FileReader();

                        reader.onload = function (event) {
                            if (event.target) setImage(event.target.result);
                        };
                        reader.readAsDataURL(file);

                        writeChanges(id, "image", file);
                    }
                }}
            />
        </>
    )
}
