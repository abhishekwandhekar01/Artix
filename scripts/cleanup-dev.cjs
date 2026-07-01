const { execSync } = require("child_process");
const { existsSync, readFileSync, unlinkSync } = require("fs");
const { join } = require("path");

const PORT = Number(process.env.PORT) || 3000;
const lockPath = join(process.cwd(), ".next", "dev", "lock");

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function killPid(pid) {
  if (!pid || pid === process.pid) return;
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    } else {
      process.kill(pid, "SIGTERM");
    }
    console.log(`Stopped process ${pid}`);
  } catch {
    // already exited
  }
}

function getListeningPids(port) {
  if (process.platform === "win32") {
    try {
      const output = execSync(`netstat -ano | findstr ":${port}"`, {
        encoding: "utf8",
      });
      const pids = new Set();
      for (const line of output.split("\n")) {
        if (!line.includes("LISTENING")) continue;
        const pid = Number(line.trim().split(/\s+/).pop());
        if (pid > 0) pids.add(pid);
      }
      return [...pids];
    } catch {
      return [];
    }
  }

  try {
    const output = execSync(`lsof -ti :${port}`, { encoding: "utf8" });
    return output
      .split("\n")
      .map((v) => Number(v.trim()))
      .filter((pid) => pid > 0);
  } catch {
    return [];
  }
}

function cleanupLock() {
  if (!existsSync(lockPath)) return;

  try {
    const lock = JSON.parse(readFileSync(lockPath, "utf8"));
    if (lock.pid) killPid(lock.pid);
  } catch {
    // ignore malformed lock
  }

  try {
    unlinkSync(lockPath);
  } catch {
    // ignore
  }
}

cleanupLock();

for (const pid of getListeningPids(PORT)) {
  killPid(pid);
}
