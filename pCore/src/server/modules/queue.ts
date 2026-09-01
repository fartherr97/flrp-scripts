import { queueConfig } from "../../configs/queue";
import { priorityQueue, queueElem } from "./classes/queueClasses";
import { getPlayerRolesAndCategories } from "./playerPerms";

if (queueConfig.enabled) {
    StopResource('hardcap'); // Stop hardcap to allow for queue to work properly.
}

// Create the queue
const queue = new priorityQueue();

// Create a map for a grace list
const graceList = new Map<string, Date>();

// Counter for number of players in the server
let playerCount = GetNumPlayerIndices();
let maxPlayers = queueConfig.settings.maxPlayers;

export const playerConnecting = async (deferrals: any, src: string, userID: string, name: string) => {
    if(!queueConfig.enabled) {
        playerCount++;
        setTimeout(() => {
            deferrals.done();
        }, 100);
        return;
    }

    // Add the player to the queue
    await addToQueue(src, userID, name, 0);
    debugLog(`Added ${name} to the queue. In position ${queue.getPosition(src)}.`);

    let queueInterval = setInterval(() => {
        runQueue(deferrals, src, userID, name, queueInterval);
    }, 500);
}

const addToQueue = async (src: string, userID: string, name: string, interval: any) => {
    let priority = await getPriority(src);
    // Check if the player is in the grace list
    if(graceList.has(userID)) {
        priority = 1;
    }
    const elem = new queueElem(userID, priority, src);
    queue.insert(elem);
    console.log(`^7[^6Queue^7] ^4${name}^3 added to queue with priority ^4${priority}^7.`);
}


// Run the queue
const runQueue = (deferrals: { presentCard: (arg0: any) => void, done: (arg?: string) => void}, src: string, userID: string, name: string, queueInterval: NodeJS.Timeout) => { 
    if(!queue.isEmpty()) {
        // Update the deferrals
        updateDeferrals(deferrals, src);
        // Is there space on the server? If not, return.
        if(playerCount >= maxPlayers) return;
        const next = queue.next();
        if(next?.src == src) {
            clearInterval(queueInterval);
            console.log(`^7[^6Queue^7] ^4${name}^3 is next in queue^7. ^2Connecting^7.`);
            playerCount++;
            queue.shift();
            deferrals.done();
        }
    } else {
        debugLog(`Queue is empty. Something went wrong...^7`);
        clearInterval(queueInterval);
        // Get new player count
        playerCount = GetNumPlayerIndices();
        deferrals.done("Something went wrong. Please try again.");
    }
}


// Update the deferrals
const updateDeferrals = (deferrals: { presentCard: (arg0: any) => void, done: () => void}, src: string) => {
    const pos = queue.getPosition(src) + 1;
    const queueLength = queue.length();
    const msg = `You are currently in position ${pos}/${queueLength} in the queue. Please wait.`;
    const card = updateCard(msg);
    deferrals.presentCard(card);
}

// Handle player dropped
export const playerDropped = (src: string, discordID: string | null) => {
    if (discordID == null) return;
    // Add to grace list
    graceList.set(discordID, new Date());
    debugLog(`Added ${discordID}} to grace list.`);
    // Check if the player is in the queue, and remove them if they are.
    const elem = new queueElem(discordID, 0, src);
    if(queue.contains(elem)) {
        // Get the element from the queue
        const e = queue.queue[queue.getPosition(src)];
        queue.remove(e);
        console.log(`^7[^6Queue^7] ^4${GetPlayerName(src)}^7 dropped. Removing from queue.^7`);
        // Stop the interval
        clearInterval(elem.interval)
        // Reduce player count
    }
    // Reduce player count
    playerCount--;
}

// Remove ghostusers every 10 seconds
const ghostuserint = setInterval(() => {
    let count = 0;
    for(let i = 0; i < queue.length(); i++) {
        const src = queue.queue[i].src;
        if(GetPlayerName(src) == null) {
            // Stop the interval
            clearInterval(queue.queue[i].interval);
            queue.remove(queue.queue[i]);
            count--;
        }
    }
    if(count > 0) debugLog(`Removed ${count} ghost users from the queue.`);
}, 10000);
if(!queueConfig.enabled) clearInterval(ghostuserint);

// Clean grace list every 30 seconds, and update the player count
const gracelistint = setInterval(() => {
    const now = new Date();
    for(const [key, value] of graceList.entries()) {
        if((now.getMinutes() - value.getMinutes()) > queueConfig.settings.graceListTime) {
            graceList.delete(key);
            debugLog(`Removed ${key} from grace list.`);
        }
    }
    // Update player count
    playerCount = GetNumPlayerIndices();
}, 30000);
if(!queueConfig.enabled) clearInterval(gracelistint);

// If debug is enabled, print the queue every 30 seconds
if(queueConfig.settings.debug) setInterval(() => {
    queue.print();
    // Print the grace list
    // console.log(graceList);
    // Print the player count
    console.log(`^7[^6Queue^7] There are currently ${playerCount}/${maxPlayers} players in the server. (${GetNumPlayerIndices()})^7`);
}, 30000);

// Get the priority of a user
const getPriority = async (src: string): Promise<number> => {
    const roles = await getPlayerRolesAndCategories(src);
    let priority = queueConfig.default_prio;
    Object.entries(queueConfig.priority).forEach(([key, value]) => {
        if(roles.includes(key) && value < priority) priority = value;
    });
    return priority;
}

const debugLog = (msg: string) => {
    if(queueConfig.settings.debug) console.log(`^7[^6Queue^7] ${msg}^7`);
}

const updateCard = (msg: string) => {
    return {
        "type":"AdaptiveCard",
        "body":[
            {
                "type":"Container",
                "items":
                [
                    {
                        "type":"TextBlock",
                        "text": queueConfig.adaptiveCard.card_title,
                        "wrap":true,
                        "fontType":"Default",
                        "size":"extralarge",
                        "weight":"bolder",
                        "color":"light",
                        "horizontalAlignment":"center",
                        "isVisible": queueConfig.adaptiveCard.card_title_isVisible
                    },
                    {
                        "type":"TextBlock",
                        "text": msg,
                        "wrap":true,
                        "size":"large",
                        "weight":"bolder",
                        "color":"light",
                        "horizontalAlignment":"center"
                    },
                    {
                        "type":"TextBlock",
                        "text": queueConfig.adaptiveCard.card_description,
                        "wrap":true,
                        "color":"light",
                        "size":"medium",
                        "horizontalAlignment":"center"
                    },
                    {
                        "type":"ColumnSet","height":"stretch",
                        "minHeight":"35px","bleed":true,
                        "horizontalAlignment":"center",
                        "columns":
                        [
                            {
                                "type":"Column",
                                "width":"stretch",
                                "horizontalAlignment": "center",
                                "items":
                                [
                                    {
                                        "type":"ActionSet",
                                        "horizontalAlignment": "right",
                                        "actions":
                                        [
                                            {
                                                "type":"Action.OpenUrl",
                                                "title": queueConfig.adaptiveCard.button1_title,
                                                "style":"default",
                                                "url": queueConfig.adaptiveCard.button1_url,
                                                "iconUrl": queueConfig.adaptiveCard.button1_iconUrl
                                            }
                                        ]
                                    }
                                ],
                                "height":"stretch"
                            },
                            {
                                "type":"Column",
                                "width":"stretch",
                                "horizontalAlignment": "center",
                                "items":
                                [
                                    {
                                        "type":"ActionSet",
                                        "horizontalAlignment": "center",
                                        "actions":
                                        [
                                            {
                                                "type":"Action.OpenUrl",
                                                "title": queueConfig.adaptiveCard.button2_title,
                                                "style":"default",
                                                "url": queueConfig.adaptiveCard.button2_url,
                                                "iconUrl": queueConfig.adaptiveCard.button2_iconUrl
                                            }
                                        ]
                                    }
                                ]
                           },
                           {
                            "type":"Column",
                            "width":"stretch",
                            "horizontalAlignment": "center",
                            "items":
                            [
                                {
                                    "type":"ActionSet",
                                    "horizontalAlignment": "left",
                                    "actions":
                                    [
                                        {
                                            "type":"Action.OpenUrl",
                                            "title": queueConfig.adaptiveCard.button3_title,
                                            "style":"default",
                                            "url": queueConfig.adaptiveCard.button3_url,
                                            "iconUrl": queueConfig.adaptiveCard.button3_iconUrl
                                        }
                                    ]
                                }
                            ]
                       }
                        ]
                    }
                ],
                "style":"default",
                "bleed":true,
                "height":"automatic",
                "isVisible":true
            }
        ],
        "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
        "version":"1.3",
    }
} 
