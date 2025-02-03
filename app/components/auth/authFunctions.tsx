
export function addUserKey(userKey: string) {
    localStorage.setItem('userKey', userKey);
}
export function removeUserKey() {
    localStorage.removeItem('userKey');
}