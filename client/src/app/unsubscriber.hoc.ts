export function Unsubscriber(keys: string[]) {
  return (cmpType) => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵcmp.factory = (...args) => {
      const cmp = originalFactory(...args);

      cmpType.ɵcmp.ngOnDestroy = () => {
        if (cmp.ngOnDestroy) {
          cmp.ngOnDestroy();
        }
        keys.forEach(key => {
          if (cmp[key]) {
            cmp[key].unsubscribe();
          }
        });

      }
      return cmp;
    };
    return cmpType;
  }
}
