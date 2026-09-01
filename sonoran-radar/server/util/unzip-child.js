(() => {
    var extract = require("extract-zip");
    var path = require("path");

    function sendResult(message, exitCode) {
        if (typeof process.send === "function") {
            process.send(message, () => process.exit(exitCode));
            return;
        }

        process.exit(exitCode);
    }

    process.once("message", async ({ file, dest }) => {
        try {
            await extract(path.resolve(file), { dir: path.resolve(dest) });
            sendResult({ ok: true }, 0);
        } catch (err) {
            sendResult({ ok: false, error: err && err.message ? err.message : String(err) }, 1);
        }
    });
})();
