import { createTerminus } from "@godaddy/terminus";
import { Server } from "http";

function readinessCheck() {
    return Promise.resolve();
}

function livenessCheck() {
    // check for stuff like db connection later
    return Promise.resolve();
}

export default function initHealthChecksWithServer(server: Server) {
    createTerminus(server, {
        // healtcheck options
        healthChecks: {
            "/hodappba/_health/liveness": livenessCheck,
            "/hodappba/_health/readiness": readinessCheck,
        },

        // cleanup options
        timeout: 1000,
    });
}
