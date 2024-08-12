import { useEffect, useState } from 'react'

export const useScroll = (srollValue: number) => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (document && window) {
            document.addEventListener("scroll", () => {
                if (window.scrollY >= srollValue) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            });
        }
        return document.removeEventListener("scroll", () => {
            if (window.scrollY >= srollValue) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });
    }, []);

    return [scrolled]
}
