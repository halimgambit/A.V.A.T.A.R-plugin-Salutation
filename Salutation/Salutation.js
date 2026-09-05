import { getHours } from "date-fns";

export async function init () {
    await Avatar.lang.addPluginPak('Salutation');
}

export async function action(data, callback) {
    try {
        const L = await Avatar.lang.getPak('Salutation', data.language);

        const actions = {
            getGreeting: () => getGreetingAction(data, data.client, L)
        };

        info("Salutation:", data.action.command, "from", data.client);
        
        await actions[data.action.command]();

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error("Salutation Error:", err.message);
    } finally {
    callback();
    }
}

const getGreetingAction = (data, client, L) => {
    const firstName = Config.modules.Salutation.firstName;

    let sentence = (data.rawSentence || data.action?.sentence || "")
        .toLowerCase()
        .replace(/^(dis|dit)\s+/i, "")
        .replace(/\s+/g, " ")
        .trim();

    const hour = getHours(new Date());
    let period;
    if (hour < 5) period = L.get("speech.goodEvening");
    else if (hour < 12) period = L.get("speech.goodMorning");
    else if (hour < 17) period = L.get("speech.goodAfternoon");
    else period = L.get("speech.goodEvening");

    const match = sentence.match(/(bonjour|bonsoir|bon[ -]après[ -]midi|salut)/i);

    if (match) {
        const greeting = match[1] || period;

        let name = sentence.replace(match[1], "").trim();
        name = name.replace(/^à\s+/i, "").replace(/\s+à\s+/i, " ").trim();

        if (name) {

            if (/\b(tous|tout le monde)\b/i.test(name)) {
                name = L.get("speech.everyone");
            } else {
                const rep = L.get("speech.replace");
                if (rep) {
                    for (const [k, v] of Object.entries(rep)) {
                        name = name.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
                    }
                }
            }

            const final = L.get(["speech.greeting", greeting, name.trim()]);
            info(final);
            Avatar.speak(final, client, () => Avatar.Speech.end(client));
            return;
        }
    }

    const final = L.get(["speech.defaultGreeting", period, firstName]);
    info(final);
    Avatar.speak(final, client, () => Avatar.Speech.end(client));
};

