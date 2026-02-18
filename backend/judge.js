const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

module.exports = function (code, problem) {

    return new Promise((resolve) => {

        const cppPath = path.join(__dirname, "submissions", "code.cpp");
        const exePath = path.join(__dirname, "submissions", "code.exe");

        fs.writeFileSync(cppPath, code);

        exec(`g++ "${cppPath}" -o "${exePath}"`, (err) => {

            if (err) {
                resolve("Compilation Error");
                return;
            }

            let tests = problem.testcases;
            let i = 0;

            function runNext() {

                if (i >= tests.length) {
                    resolve("Accepted");
                    return;
                }

                const child = exec(`"${exePath}"`, { timeout: 2000 },
                    (err, stdout) => {

                        if (err) {
                            resolve("Runtime Error");
                            return;
                        }

                        if (stdout.trim() !== tests[i].output.trim()) {
                            resolve("Wrong Answer");
                            return;
                        }

                        i++;
                        runNext();
                    });

                child.stdin.write(tests[i].input + "\n");
                child.stdin.end();
            }

            runNext();
        });
    });
};