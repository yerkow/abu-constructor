interface PageProps {
    params: { id: string, locale: string }
}
export default async function Page({ params }: PageProps) {

    console.log(params)


    return (
        <section>

        </section>
    );
}
