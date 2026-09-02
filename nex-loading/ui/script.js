// ==========================================================================
// FLRP :: Florida Roleplay loading screen configuration.
// The team-member and Discord-icon images can be either a filename inside
// assets/ (like the seasonal defaults) OR a full https:// URL — the FiveM
// loading-screen browser has live internet, so we point them at the FLRP
// logo hosted on flrp.us instead of bundling it.
// ==========================================================================
const FLRP_LOGO = "https://www.flrp.us/images/c8452f76261f8e9c.png";

const server_data = {
    name: "Florida Roleplay",
    discord: {
        // TODO(FLRP): set `id` to your Discord server ID (enable Developer Mode
        // in Discord → right-click the server → Copy Server ID) so the live
        // online/member counts work. Until then the counts fall back to
        // `total_members` below and the server name.
        id: "123456789123456789",
        total_members: "Join us",
        invite_url: "https://discord.gg/floridarp",
        server_icon: FLRP_LOGO
    },
    // Only the socials FLRP actually runs are listed. Add store / tiktok / x /
    // youtube blocks back in (type + link) when those channels go live.
    socials: [
        {
            type: "website",
            link: "https://www.flrp.us",
        },
        {
            type: "discord",
            link: "https://discord.gg/floridarp",
        }
    ],
    // Server rules. Categories and rule numbers (1.x, 2.x ...) are generated
    // automatically. Colours: 'normal', 'red' (important) and 'blue' (Discord).
    rules: [
        {
            category: "Network Rules",
            colour: "red",
            rules: [
                {
                    title: "NO HATE OR HARASSMENT",
                    description: "Discrimination, slurs, hate speech, or harassment of any player — in game, in voice, or in Discord — results in an immediate ban. Treat everyone with respect, OOC and IC."
                },
                {
                    title: "NO CHEATS OR EXPLOITS",
                    description: "Mod menus, injectors, macros, or abusing bugs and exploits are strictly prohibited. Found a bug? Report it in a ticket instead of using it."
                },
                {
                    title: "NO BAN OR PUNISHMENT EVASION",
                    description: "Evading a ban or staff punishment with alternate accounts extends the punishment and can make it permanent. Appeal through Discord, don't evade."
                },
                {
                    title: "FOLLOW THE FIVEM & CFX TERMS",
                    description: "All players must follow the FiveM and Cfx.re Terms of Service and Code of Conduct at all times while connected to Florida Roleplay."
                },
            ]
        },
        {
            category: "Roleplay Rules",
            colour: "normal",
            rules: [
                {
                    title: "VALUE OF LIFE & FEAR RP",
                    description: "Roleplay realistic fear for your character's life. When a gun is on you or you're clearly outnumbered, comply — don't act invincible."
                },
                {
                    title: "NEW LIFE RULE (NLR)",
                    description: "If your character is downed and respawns, you forget the events leading to your death and cannot return to that scene or seek revenge."
                },
                {
                    title: "NO RDM / VDM",
                    description: "No Random Deathmatch or Vehicle Deathmatch. You must have valid, initiated roleplay reasoning before harming another player."
                },
                {
                    title: "NO METAGAMING OR MIXING",
                    description: "Do not use out-of-character information (streams, Discord, OOC chat) in character. Keep IC and OOC separate at all times."
                },
                {
                    title: "NO FAIL RP",
                    description: "Roleplay realistically. No unrealistic driving, powergaming, or breaking character in an active scene without an admin present."
                },
            ]
        },
        {
            category: "Discord Rules",
            colour: "blue",
            rules: [
                {
                    title: "KEEP IT RESPECTFUL",
                    description: "The same respect required in game applies in our Discord. No drama, witch-hunting, or calling out staff/players publicly — use tickets."
                },
                {
                    title: "NO SPAM OR NSFW",
                    description: "No spam, self-promotion, advertising, or NSFW / illegal content in any channel. Keep every channel on-topic."
                },
                {
                    title: "USE TICKETS FOR HELP",
                    description: "Questions, reports, ban appeals, and department applications all go through the ticket system so staff can help you properly."
                }
            ]
        },
    ],
    // FLRP leadership. Replace the names/titles with your real staff and, if you
    // want individual avatars, drop PNGs into assets/avatars/ and set `image`
    // to the filename. Any entry left on FLRP_LOGO simply shows the FLRP badge.
    team_members: [
        {
            name: "Ownership",
            title: "Florida Roleplay",
            image: FLRP_LOGO
        },
        {
            name: "Directors",
            title: "Florida Roleplay",
            image: FLRP_LOGO
        }
    ]
}

// There's two options for a background, image or video, the files for these are located in assets/backgrounds, so place your content in that folder and then specify the file name below.
const backgrounds = [
    { type: 'image', file: 'background_image.png' },
    // { type: 'video', file: 'video.webm' } // The video file MUST be a .WEBM file, the MP4 file format is not supported!
];

// Loading-screen music. Files live in assets/music/ — set the filename plus a
// title/artist and you're set.
//
// !!! DMCA WARNING (FLRP): the two demo tracks that ship with Nex Loading
// ("Big Dawgs" and "22") are COPYRIGHTED and can get the server struck. Before
// going live, replace assets/music/loading.mp3 and loading2.mp3 with
// royalty-free / licensed audio (e.g. YouTube Audio Library, Pixabay Music,
// Uppbeat) and update the title/artist below to match.
const music = [
    {
        file: "loading.mp3",
        title: 'Replace me — royalty-free track 1',
        artist: 'FLRP'
    },
    {
        file: "loading2.mp3",
        title: 'Replace me — royalty-free track 2',
        artist: 'FLRP'
    },
];

// These two are used for development purposes, you can ignore these.
const automate_themes = true;
let theme_override = "";

const themes = {
    default_theme: {
        description: "Welcome to Florida Roleplay — serious Miami-based RP with BCSO, FHP & MPD. Grab your callsign, get on duty, and keep it clean out there.",
        accent_colour: "0, 191, 196"
    },

    // 15th October to 31st October
    halloween: {
        start: new Date(new Date().getFullYear(), 9, 15),
        end: new Date(new Date().getFullYear(), 9, 31, 23, 59, 59),
        description: "It’s the season of spooky scary skeletons, prepare for cobwebs and pumpkins!",
        icons: ["pumpkin.png", "skull.png", "grave.png"],
        accent_colour: "255, 122, 0"
    },

    // 1st December to 24th December
    christmas: {
        start: new Date(new Date().getFullYear(), 11, 1),
        end: new Date(new Date().getFullYear(), 11, 24, 23, 59, 59),
        description: `It's time to get into the festive spirit, as there's only ${Math.ceil((new Date(new Date().getFullYear(), 11, 25) - new Date()) /(1000 * 60 * 60 * 24))} days until Christmas!`,
        icons: ["gingerbreadman.png", "nutcracker.png", "snowglobe.png"],
        accent_colour: "255, 100, 0",
    },

    // 25th December (All Day)
    christmas_day: {
        start: new Date(new Date().getFullYear(), 11, 25, 0, 0, 0),
        end: new Date(new Date().getFullYear(), 11, 25, 23, 59, 59),
        description: "It's Christmas! Merry Christmas & Happy Holidays to all those who celebrate!",
        icons: ["santa.png", "snowman.png", "nutcracker.png"],
        accent_colour: "255, 100, 0"
    },

    // 31st December (the year is automated, no need to update each year!)
    new_years_eve: {
        start: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0),
        end: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59),
        description: `It's nearly the end of the year, get your fireworks ready as here comes ${new Date().getFullYear() + 1}!`,
        icons: ["new_year_party.png"],
        accent_colour: "200, 200, 0"
    },

    // 1st January (the year is automated, no need to update each year!)
    new_year: {
        start: new Date(new Date().getFullYear(), 0, 1, 0, 0, 0),
        end: new Date(new Date().getFullYear(), 0, 1, 23, 59, 59),
        description: `It's the New Year, Happy New Year! Welcome ${new Date().getFullYear()} and goodbye ${new Date().getFullYear() - 1}!`,
        icons: ["happy_new_year.png", "new_year_calendar.png"],
        accent_colour: "255, 100, 100",
    },

    // 29th January (will require updating each year)
    chinese_new_year: {
        start: new Date(new Date().getFullYear(), 0, 29, 0, 0, 0),
        end: new Date(new Date().getFullYear(), 0, 29, 23, 59, 59),
        description: "Happy Chinese New Year!",
        icons: ["chinese_lantern.png", "chinese_fan.png", "chinese_rocket.png"],
        accent_colour: "255, 69, 0"
    },

    // 4th July
    fourth_of_july: {
        start: new Date(new Date().getFullYear(), 6, 4, 0, 0, 0),
        end: new Date(new Date().getFullYear(), 6, 4, 23, 59, 59),
        description: "It's the day of Independence, prep the fireworks and American flags!",
        icons: ["firework.png", "new_year_party.png"],
        accent_colour: "0, 82, 204"
    },

    /*
    theme_name: { // Set this to the theme name, like "halloween", "thanks_giving" etc
        start: new Date(year, month, day, hour, minute, second), // The start date of the theme
        end: new Date(year, month, day, hour, minute, second),   // The emd date of the theme
        description: "Text to display in the header description", // The message shown below the 'Welcome to <insert server name here>'
        icons: ["icon1.png", "icon2.png"], // The collection of images that'll rotate, you can add one or multiple, either works
        accent_colour: "R, G, B" // The accent colour, set in RGB (Red, Green and Blue)
    }
    */
};

// You shouldn't need to edit anything below this, if you do, do so at your own risk!
window.addEventListener('DOMContentLoaded', () => {
    const success = window.nuiHandoverData.success;
    // success = true
    const nav_items = document.querySelectorAll('.nav-item');
    const main_container = document.getElementById('main-container');
    const rules_section = document.getElementById('rules-section');
    const team_section = document.getElementById('team-section');
    const background = backgrounds.find(bg => bg.file && !bg.file.startsWith('#'));

    rules_section.style.display = 'none';
    team_section.style.display = 'none';

    nav_items.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            rules_section.style.display = 'none';
            team_section.style.display = 'none';
            main_container.style.visibility = 'visible';

            nav_items.forEach(nav => nav.classList.remove('active'));

            this.classList.add('active');

            const target = this.getAttribute('data-target');
            if (target === 'rules') {
                rules_section.style.display = 'flex';
            } else if (target === 'team') {
                team_section.style.display = 'grid';
            } else if (target === 'home') {
                rules_section.style.display = 'none';
                team_section.style.display = 'none';
                main_container.style.visibility = 'hidden';
            }
        });
    });

    if (background) {
        if (background.type === 'image') {
            document.body.style.backgroundImage = `url('assets/backgrounds/${background.file}')`;
            document.body.style.backgroundSize = 'contain';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        } else if (background.type === 'video') {
            document.body.style.backgroundImage = '';
            const video = document.createElement('video');
            video.src = `assets/backgrounds/${background.file}`;
            video.autoplay = true;
            video.loop = true;
            video.muted = false;
            video.style.position = 'absolute';
            video.style.top = 0;
            video.style.left = 0;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.zIndex = -1;
            document.body.appendChild(video);
        }
    }

    if (success) {
        const username = window.nuiHandoverData.player_name;
        const statistics = window.nuiHandoverData.stats;

        document.getElementById('player-profile').style.display = "block";

        document.getElementById('username').textContent = username;
        document.getElementById('member-since').textContent = `Member Since: ${statistics.member_since || 'N/A'}`;

        document.getElementById('playtime').textContent = `${statistics.playtime || 0} minutes`;
        document.getElementById('kills').textContent = `${statistics.kills || 0} kills`;
        document.getElementById('deaths').textContent = `${statistics.deaths || 0} deaths`;
        document.getElementById('messages').textContent = `${statistics.messages || 0} messages`;
        document.getElementById('connections').textContent = `${statistics.connections || 0} connections`;
        
        document.getElementById('profile-picture').src = window.nuiHandoverData.profile_picture;

        const playtime_data = statistics.playtime_data || [];
        const labels = playtime_data.map(entry => entry.formatted_day);
        const date_active = playtime_data.map(entry => entry.daily_active_time || 0);
        const date_afk = playtime_data.map(entry => entry.daily_afk_time || 0);

        const toggle_button = document.getElementById('toggle-analytics');
        const chart_container = document.getElementById('chart-container');

        let is_chart_visible = false;

        toggle_button.addEventListener('click', function() {
            is_chart_visible = !is_chart_visible;

            if (is_chart_visible) {
                chart_container.style.display = 'block';
                toggle_button.innerText = 'Hide Analytics Graph';
            } else {
                chart_container.style.display = 'none';
                toggle_button.innerText = 'Show Analytics Graph';
            }
        });

        render_chart();

        function render_chart() {
            const ctx = document.getElementById('chart').getContext('2d');
            const configuration = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Active Time',
                            data: date_active,
                            backgroundColor: 'rgba(0, 255, 0, 0.3)',
                            borderColor: 'rgba(0, 255, 0, 0.5)',
                            borderWidth: 1
                        },
                        {
                            label: 'AFK Time',
                            data: date_afk,
                            backgroundColor: 'rgba(255, 206, 86, 0.3)',
                            borderColor: 'rgba(255, 206, 86, 0.5)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(tooltipItem) {
                                    let value = tooltipItem.raw || 0;
                                    return `${tooltipItem.dataset.label}: ${value} minutes`;
                                }
                            }
                        },
                        legend: {
                            labels: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false
                }
            };
            new Chart(ctx, configuration);
        }
    }
})

let current_track = 0;
let audio = new Audio("assets/music/" + music[current_track].file);
audio.autoplay = false;
audio.volume = 0.1;

audio.addEventListener('ended', () => {
    current_track = (current_track + 1) % music.length;
    update_music_info();
    animate_music_bars();
});

const title = document.getElementById('title')
const artist = document.getElementById('artist')
const play_button = document.querySelector('.icon-tabler-player-play');
const skip_forward_button = document.querySelector('.icon-tabler-player-track-next');
const skip_back_button = document.querySelector('.icon-tabler-player-track-prev');
const bars = document.querySelectorAll('.music-visualizer .bar');

function update_music_info() {
    title.textContent = music[current_track].title;
    artist.textContent = music[current_track].artist;
    audio.src = "assets/music/" + music[current_track].file;
    audio.play().then(() => {
        update_play_icon();
    }).catch(error => console.log('Error playing audio:', error));
}

function animate_music_bars() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const bands = [{ from: 20, to: 150 }, { from: 151, to: 1600 }, { from: 1601, to: 2600 }, { from: 2601, to: 5200 }, { from: 5201, to: 7500 }, { from: 7501, to: 20000 }];

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);

        if (audio.paused) {
            bars.forEach((bar) => {
                bar.style.transition = 'height 0.5s ease';
                bar.style.height = `7px`;
            });
        } else {
            const sampleRate = context.sampleRate;
            const nyquist = sampleRate / 2;

            bars.forEach((bar, index) => {
                const band = bands[index];

                const lowIndex = Math.floor((band.from / nyquist) * bufferLength);
                const highIndex = Math.floor((band.to / nyquist) * bufferLength);

                let sum = 0;
                let count = 0;

                for (let i = lowIndex; i <= highIndex; i++) {
                    sum += dataArray[i];
                    count++;
                }

                const average = sum / count || 0;
                const barHeight = Math.max(7, (average / 255) * 37.5);
                bar.style.height = `${barHeight}px`;
            });
        }
    }

    renderFrame();
}

function toggle_play_pause() {
    if (audio.paused) {
        audio.play().then(() => {
            update_play_icon();
        })
    } else {
        audio.pause();
        update_play_icon();
    }
}

function update_play_icon() {
    if (audio.paused) {
        play_button.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>';
    } else {
        play_button.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>';
    }
}

play_button.addEventListener('click', toggle_play_pause);

skip_forward_button.addEventListener('click', () => {
    current_track = (current_track + 1) % music.length;
    audio.pause(); update_music_info(); animate_music_bars();
});

skip_back_button.addEventListener('click', () => {
    current_track = (current_track - 1 + music.length) % music.length;
    audio.pause(); update_music_info(); animate_music_bars();
});

let music_started = false;
window.addEventListener('load', () => {
    // document.addEventListener('click', () => {
    //     if (!music_started) {
    //         update_music_info();
    //         animate_music_bars();
    //         update_play_icon();
    //         music_started = true;
    //     }
    // });
    if (!music_started) {
        update_music_info();
        animate_music_bars();
        update_play_icon();
        music_started = true;
    }
    update_play_icon();
});

document.addEventListener("DOMContentLoaded", () => {
    const team_section = document.getElementById("team-section");
    team_section.innerHTML = '';

    document.getElementById('header-title').textContent = `Welcome to ${server_data.name}`

    const rules_section = document.getElementById("rules-section");
    rules_section.style.display = "block";

    server_data.rules.forEach((category, categoryIndex) => {
        const categoryCard = document.createElement("div");
        categoryCard.classList.add("rules-card");

        if (category.colour === "blue") {
            categoryCard.classList.add("blue")
        } else if (category.colour === "red") {
            categoryCard.classList.add("red")
        }

        const header = document.createElement("h2");
        header.classList.add("rules-header");
        header.innerText = category.category;
        categoryCard.appendChild(header);

        const rulesList = document.createElement("div");
        rulesList.classList.add("rules-list");

        category.rules.forEach((rule, ruleIndex) => {
            const ruleItem = document.createElement("div");
            ruleItem.classList.add("rule-item");
            ruleItem.id = `rule-${categoryIndex + 1}-${ruleIndex + 1}`;

            const ruleNumber = document.createElement("span");
            ruleNumber.classList.add("rule-number");
            ruleNumber.innerText = `${categoryIndex + 1}.${ruleIndex + 1}`;

            const ruleTitle = document.createElement("span");
            ruleTitle.classList.add("rule-title");
            ruleTitle.innerText = rule.title;

            const ruleDescription = document.createElement("p");
            ruleDescription.classList.add("rule-description");
            ruleDescription.innerText = rule.description;

            ruleItem.appendChild(ruleNumber);
            ruleItem.appendChild(ruleTitle);
            ruleItem.appendChild(ruleDescription);
            rulesList.appendChild(ruleItem);
        });

        categoryCard.appendChild(rulesList);
        rules_section.appendChild(categoryCard);
    });

    server_data.team_members.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("team-member");

        const img = document.createElement("img");
        img.src = /^https?:\/\//.test(member.image) ? member.image : `assets/avatars/${member.image}`;

        const nameHeading = document.createElement("h3");
        nameHeading.classList.add("team-name");
        nameHeading.innerText = member.name;

        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("team-title");
        titleParagraph.innerText = member.title;

        memberDiv.appendChild(img);
        memberDiv.appendChild(nameHeading);
        memberDiv.appendChild(titleParagraph);

        team_section.appendChild(memberDiv);
    });

    const social_buttons = document.getElementById('social-buttons')

    server_data.socials.forEach(social => {
        let icon;
        switch (social.type) {
            case 'website':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>';
                break;
            case 'store':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>';
                break;
            case 'tiktok':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>';
                break;
            case 'discord':
                icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-discord"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" /><path d="M7 16.5c3.5 1 6.5 1 10 0" /></svg>';
                break;
            case 'x':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>';
                break;
            case 'youtube':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg>';
                break;
            default:
                return;
        }

        const socialButton = document.createElement('a');
        socialButton.classList.add('social-btn');
        socialButton.href = social.link;
        socialButton.target = '_blank';
        socialButton.innerHTML = icon;
        socialButton.addEventListener("click", () => openLink(social.link));

        social_buttons.appendChild(socialButton);
    });

    const button_count = document.querySelectorAll('.social-btn').length;
    let columns;

    if (button_count <= 2) {
        columns = 1;
    } else if (button_count <= 4) {
        columns = 2;
    } else {
        columns = 3;
    }

    social_buttons.style.display = 'grid';
    social_buttons.style.gridTemplateColumns = `repeat(${columns}, 40px)`;
    social_buttons.style.gridGap = '10px';
    social_buttons.style.justifyContent = 'center';
    social_buttons.style.alignItems = 'center';

    update_discord_status();
});

async function update_discord_status() {
    const online_count = document.getElementById('online-count-value');
    const total_count = document.getElementById('member-count-value');
    const discord_name = document.getElementById('discord-name');
    const join_server = document.getElementById('join-server');
    const discord_icon = document.getElementById('server-icon');

    const response = await fetch(`https://discord.com/api/guilds/${server_data.discord.id}/widget.json`);
    const data = await response.json();

    total_count.textContent = `${server_data.discord.total_members} Members`;
    discord_icon.src = /^https?:\/\//.test(server_data.discord.server_icon) ? server_data.discord.server_icon : `assets/${server_data.discord.server_icon}`;
    join_server.onclick = () => window.invokeNative("openUrl", server_data.discord.invite_url);

    if (response.status === 404) {
        discord_name.textContent = server_data.name;
        online_count.textContent = `0 Online`;
        return;
    }

    online_count.textContent = `${data.presence_count} Online`;
    discord_name.textContent = data.name;
}

function set_theme() {
    const current_date = new Date();
    let theme_applied = false;

    if (theme_override && themes[theme_override]) {
        const { description, icons, accent_colour } = themes[theme_override];
        apply_theme(description, icons, accent_colour, theme_override);
        theme_applied = true;
    } else if (automate_themes) {
        for (const theme in themes) {
            const { start, end, description, icons, accent_colour } = themes[theme];
            if (start && end && current_date >= start && current_date <= end) {
                apply_theme(description, icons, accent_colour, theme);
                theme_applied = true;
                break;
            }
        }
    }

    if (!theme_applied) {
        const { description, icon, accent_colour } = themes.default_theme;
        apply_theme(description, icon ? [icon] : [], accent_colour);
    }
}

function generate_snowflakes() {
    const snowflake_container = document.querySelector(".snowflakes");

    if (snowflake_container.childElementCount >= 100) return;

    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    const size = Math.random() * 20 + 5;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size / 4}px`;

    snowflake.style.top = `${Math.random() * -100 - 50}px`;
    snowflake.style.left = `${Math.random() * 100}vw`;

    const driftAmount = Math.random() * 30 - 15;
    snowflake.style.setProperty("--drift", `${driftAmount}px`);
    snowflake.style.animationDuration = `${Math.random() * 3 + 7}s`;

    snowflake_container.appendChild(snowflake);
    snowflake.addEventListener("animationend", () => {
        snowflake.remove();
    });
}

// Credit to Jack Rugile for the code below: https://codepen.io/jackrugile/pen/kQwPRO
class LightningCanvas {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.lightningBolts = [];
        this.lightTimeCurrent = 0;
        this.lightTimeTotal = 50;
        this.now = Date.now();
        this.delta = 0;
        this.then = this.now;

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    init() {
        this.resizeCanvas();
        this.loop();
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createBolt(x, y, canSpawn) {
        this.lightningBolts.push({
            x,
            y,
            xRange: this.random(5, 30),
            yRange: this.random(5, 25),
            path: [{ x, y }],
            pathLimit: this.random(10, 35),
            canSpawn,
            grower: 0,
            growerLimit: 5,
            hasFired: false,
        });
    }

    updateBolts() {
        for (let i = this.lightningBolts.length - 1; i >= 0; i--) {
            const bolt = this.lightningBolts[i];
            bolt.grower += this.delta;

            if (bolt.grower >= bolt.growerLimit) {
                bolt.grower = 0;
                bolt.growerLimit *= 1.05;
                const lastPoint = bolt.path[bolt.path.length - 1];

                bolt.path.push({
                    x: lastPoint.x + (this.random(0, bolt.xRange) - bolt.xRange / 2),
                    y: lastPoint.y + this.random(0, bolt.yRange),
                });

                if (bolt.path.length > bolt.pathLimit) {
                    this.lightningBolts.splice(i, 1);
                }
                bolt.hasFired = true;
            }
        }
    }

    renderBolts() {
        for (const bolt of this.lightningBolts) {
            this.ctx.strokeStyle = `hsla(0, 100%, 100%, ${this.random(10, 100) / 100})`;
            this.ctx.beginPath();
            this.ctx.moveTo(bolt.x, bolt.y);

            for (const point of bolt.path) {
                this.ctx.lineTo(point.x, point.y);

                if (bolt.canSpawn && this.random(0, 100) === 0) {
                    bolt.canSpawn = false;
                    this.createBolt(point.x, point.y, false);
                }
            }

            this.ctx.lineWidth = 1;
            if (this.random(0, 30) === 0) this.ctx.lineWidth = 2;
            if (this.random(0, 60) === 0) this.ctx.lineWidth = 3;
            if (this.random(0, 90) === 0) this.ctx.lineWidth = 4;

            if (!bolt.hasFired || this.random(0, 60) === 0) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${this.random(1, 3) / 100})`;
                this.ctx.fillRect(0, 0, this.width, this.height);
            }

            this.ctx.stroke();
        }
    }

    lightningTimer() {
        this.lightTimeCurrent += this.delta;
        if (this.lightTimeCurrent >= this.lightTimeTotal) {
            const x = this.random(100, this.width - 100);
            const y = this.random(0, this.height / 2);
            const boltCount = this.random(1, 3);

            for (let i = 0; i < boltCount; i++) {
                this.createBolt(x, y, true);
            }

            this.lightTimeCurrent = 0;
            this.lightTimeTotal = this.random(200, 1500);
        }
    }

    clearCanvas() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0, ${this.random(1, 30) / 100})`;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalCompositeOperation = 'source-over';
    }

    resizeCanvas() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));

        this.now = Date.now();
        this.delta = this.now - this.then;
        this.then = this.now;

        this.clearCanvas();
        this.updateBolts();
        this.lightningTimer();
        this.renderBolts();
    }
}

const bolts = document.getElementById('lightning-bolts');
const lightning_effect = new LightningCanvas(bolts);

function apply_theme(description, icons, accent_colour, theme_name) {
    document.getElementById("heater-description").textContent = description;
    const icon = "assets/header_icons/" + icons[Math.floor(Math.random() * icons.length)];
    document.querySelector(".header-icon img").src = icon;

    if (icons) {
        document.getElementById("header-icon").style.visibility = "visible";
    }

    const accent_style = accent_colour ? `linear-gradient(to right, rgba(255, 255, 255, 0.1) 50%, rgba(${accent_colour}, 0.15) 100%)` : "linear-gradient(to right, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.2) 100%)";

    document.querySelector(".header").style.background = accent_style;
    document.querySelector(".main-container").style.background = accent_style;

    if (theme_name === "christmas_day" || theme_name === "christmas") {
        setInterval(generate_snowflakes, 150);
    } else if (theme_name === "halloween") {
        lightning_effect.init();
    }
}

document.addEventListener("DOMContentLoaded", set_theme);

function openLink(url) {
    window.invokeNative("openUrl", url);
}