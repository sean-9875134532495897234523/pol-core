
const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

async function loadLocalEnvironmentVariables() {
    const text = await Deno.readTextFile("./environment/local_env_vars.json");
    const envVars : Record<string, unknown> = JSON.parse(text);
    for (const setting in envVars) {
        Deno.env.set(setting, envVars[setting] as string);
    }
}

export function configure() {
    if (!isDenoDeploy) {
        loadLocalEnvironmentVariables();
    }
}