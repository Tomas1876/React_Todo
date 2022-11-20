export const useCertify = () => {
    return localStorage.getItem('userToken') !== (undefined || null);
}

