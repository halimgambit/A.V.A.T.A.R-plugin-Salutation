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

        if (actions[data.action.command]) {
            await actions[data.action.command]();
        }

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error("Salutation Error:", err.message);
    } finally {
    callback();
    }
}

const getGreetingAction = (data, client, L) => {

    const firstName = Config.modules.Salutation.firstName;

    let sentence = (data.rawSentence || data.action?.rawSentence || data.action?.sentence || "").toLowerCase()
    .replace(/^(dis|dit)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();

    const match = sentence.match(/^(bonjour|bonsoir|salut)?\s*(?:à\s+)?(.+)?$/i);

    const hour = getHours(new Date());
    const period = hour >= 18 || hour < 5
        ? L.get("speech.goodEvening")
        : L.get("speech.goodMorning");

    if (match && match[2]?.trim()) {

        let greeting = match[1] || period;
        let name = match[2].trim();

        if (/\b(tous|tout le monde)\b/i.test(name)) {
            name = L.get("speech.everyone");
        } else {
            const rep = L.get("speech.replace");
            Object.entries(rep).forEach(([k, v]) => {
                name = name.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
            });
        }

        const final = L.get(["speech.greeting", greeting, name]);

        Avatar.speak(final, client, () => Avatar.Speech.end(client));
        return;
    }

    const final = L.get(["speech.defaultGreeting", period, firstName]);

    Avatar.speak(final, client, () => Avatar.Speech.end(client));
};

