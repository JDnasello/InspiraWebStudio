import { useEffect, useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";

const useParallax = (itemRefs, targetPos, duration) => {
    const updateTargetPositions = (isMobile) =>
        isMobile
            ? targetPos
            : {
                item1: { x: -60, y: 60, rotation: 65 },
                item2: { x: -50, y: -50, rotation: 30 },
                item3: { x: -80, y: 0, rotation: 90 },
                item4: { x: 40, y: -80, rotation: -45 },
                item5: { x: 40, y: 80, rotation: 180 },
                item6: { x: 0, y: -30, rotation: 0 },
                item7: { x: 0, y: -30, rotation: 0 }
            };

    const getInitialTargetPositions = () =>
        updateTargetPositions(window.innerWidth <= 460);

    const [targetPositions, setTargetPositions] = useState(
        getInitialTargetPositions
    );

    const adjustPositionsForScreenSize = () => {
        const isMobile = window.innerWidth <= 1100;
        setTargetPositions(updateTargetPositions(isMobile));


    };

    const moverElemento = (elemento, targetPos, scrollOffset, velocidad) => {
        const currentX = (targetPos.x * scrollOffset * velocidad) / 100;
        const currentY = (targetPos.y * scrollOffset * velocidad) / 100;
        const currentRotation =
            (targetPos.rotation * scrollOffset * velocidad) / 100;

        elemento.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
    };

    const handleScroll = useCallback(
        debounce(() => {
            const scrollOffset = window.scrollY;
            Object.entries(itemRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    moverElemento(ref.current, targetPositions[key], scrollOffset, duration);
                }
            });
        }, 10),
        [itemRefs, targetPositions, duration]
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = debounce(() => {
            adjustPositionsForScreenSize();
        }, 100);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        for (const ref of Object.values(itemRefs)) {
            if (ref.current) {
                ref.current.style.transform = `translate(0, 0) rotate(0deg)`;
            }
        }
    }, [itemRefs]);

    
};

export default useParallax;
