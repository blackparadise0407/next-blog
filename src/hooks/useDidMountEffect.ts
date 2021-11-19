import { EffectCallback, useEffect, useRef } from 'react';

export default function useDidMountEffect(fn: EffectCallback, deps: any[]) {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            const unmount = fn();
            return () => {
                mounted.current = false;
                unmount?.();
            };
        } else mounted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
