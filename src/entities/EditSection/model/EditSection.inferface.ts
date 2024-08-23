type InputList = {
    label: string;
    type: string;
    value: string
    onChange: (value: string) => void
}

interface IEditSectionProps {
    inputList: InputList[]
}