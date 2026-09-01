var child_process = require("child_process");
var path = require("path");

function createChildError(message) {
    return new Error(message || "Unzip worker failed without an error message.");
}

function getWorkerPath() {
    return path.join(GetResourcePath(GetCurrentResourceName()), "server", "util", "unzip-child.js");
}

function unzipInChild(file, dest) {
    return new Promise((resolve, reject) => {
        var worker = child_process.fork(getWorkerPath(), [], {
            windowsHide: true,
            stdio: ["ignore", "pipe", "pipe", "ipc"]
        });

        var settled = false;

        var finish = (err) => {
            if (settled) return;
            settled = true;
            if (err) reject(err);
            else resolve();
        };

        if (worker.stdout) {
            worker.stdout.on("data", (chunk) => {
                var output = chunk.toString().trim();
                if (output.length > 0) console.log(output);
            });
        }

        if (worker.stderr) {
            worker.stderr.on("data", (chunk) => {
                var output = chunk.toString().trim();
                if (output.length > 0) console.error(output);
            });
        }

        worker.once("message", (message) => {
            if (message && message.ok) {
                finish();
                return;
            }

            finish(createChildError(message && message.error));
        });

        worker.once("error", (err) => finish(err));
        worker.once("exit", (code, signal) => {
            if (settled) return;
            if (code === 0) {
                finish();
                return;
            }

            var details = signal ? ("signal " + signal) : ("code " + code);
            finish(createChildError("Unzip worker exited with " + details + "."));
        });

        worker.send({ file, dest });
    });
}

exports("UnzipFile", (file, dest) => {
    unzipInChild(file, dest)
        .then(() => exports[GetCurrentResourceName()].unzipCoreCompleted(true))
        .catch((err) => exports[GetCurrentResourceName()].unzipCoreCompleted(false, err && err.message ? err.message : String(err)));
});
