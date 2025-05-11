export function onError(users, userId, res) {
    const uuidIsValid = isValidUuid(userId);
    const certainUser = users.find(({ id }) => id === userId);
    if (userId) {
        if (!uuidIsValid) {
            handleErrorMessage(400, res, "UserId is invalid");
            return true;
        }
        else if (!certainUser) {
            handleErrorMessage(404, res, "User not found");
            return true;
        }
    }
    return false;
}
export function handleErrorMessage(status, res, message) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message }));
}
function isValidUuid(str) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
}
