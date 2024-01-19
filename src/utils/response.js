// Returns 200 Success
exports.success = (res, data) => {
    const response = { data: data };
    return res.status(200).json({ status: "Success", ...response });
};

// Returns 500 Internal Server Error
exports.serverError = (res, message) => {
    return res.status(500).json({ status: "Error", message: message || "Internal Server Error" });
};

// Returns 401 Unauthorized
exports.serverUnauthorized = (res, message) => {
    return res.status(401).json({ status: "Error", message: message || "Unauthorized" });
};

// Returns 403 PermissionDenied
exports.permissionDenied = (res, message) => {
    return res.status(403).json({ status: "Error", message: message || "Permission Denied" });
};

// Returns 400 Validation Error
exports.validationError = (res, message) => {
    return res.status(400).json({ status: "Error", message: message || "Validation Error" });
};

// Returns 400 Bad Request
exports.badRequest = (res, message) => {
    return res.status(400).json({ status: "Error", message: message || "Bad Request" });
};

// Returns 404 Not Found Error
exports.notFoundError = (res, message) => {
    return res.status(404).json({ status: "Error", message: message || "Not Found" });
};

// Returns 409 Conflict
exports.conflict = (res, message) => {
    return res.status(409).json({ status: "Error", message: message || "Request is in conflict with current state of the server" });
};

