
const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

console.log('DENO_DEPLOYMENT_ID: ' + Deno.env.get("DENO_DEPLOYMENT_ID"));
console.log('isDenoDeploy: ' + isDenoDeploy);

async function loadLocalEnvironmentVariables() {
    const text = await Deno.readTextFile("./environment/local_env_vars.json");
    const envVars : Record<string, unknown> = JSON.parse(text);
    for (const setting in envVars) {
        console.log(setting, envVars[setting]);
        Deno.env.set(setting, envVars[setting] as string);
    }
}

export function configure() {
    if (!isDenoDeploy) {
        loadLocalEnvironmentVariables();
    }
}