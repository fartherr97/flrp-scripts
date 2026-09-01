window.addEventListener('message', function(event) {
    const data = event.data;
    switch (data.action) {
        case 'open_duty_menu':
            open_duty_menu(data.entities, data.max_callsign_length);
            if (data.is_wide) {
                document.getElementById('duty-menu').style.width = "425px";
            }
            break;
        case 'open_units_menu':
            open_units_menu(data.units);
            document.getElementById('server-name').textContent = `for ${data.server_name}`;
            break;
        case 'fetch_unit_info':
            open_unit_modal(data.unit);
            break;
        case 'open_manage_menu':
            open_manage_menu(data.data);
            break;
        case 'toggle_bodycam':
            toggle_bodycam(data.time, data.name, data.callsign)
            break;
        case 'hide_bodycam':
        case 'show_bodycam':
            document.getElementById('bodycam').style.display = (data.action === 'show_bodycam' ? 'flex' : 'none');
        break;
    }
});

let bodycam_timer;

function toggle_bodycam(time, name, callsign) {
    const bodycam = document.getElementById('bodycam');

    if (!time || !name || !callsign) {
        bodycam.style.display = "none";
        if (bodycam_timer) clearInterval(bodycam_timer);
        return;
    }

    let current_time = time;

    function format(ts) {
        const date = new Date(ts * 1000);
        return date.toISOString().replace('T', ' ').replace('.000', '');
    }    

    document.getElementById('bodycam-time').textContent = format(current_time);
    document.getElementById('bodycam-name').textContent = `${name} [${callsign}]`;
    bodycam.style.display = "flex";

    if (bodycam_timer) clearInterval(bodycam_timer);
    bodycam_timer = setInterval(() => {
        current_time += 1;
        document.getElementById('bodycam-time').textContent = format(current_time);
    }, 1000);
}

function open_duty_menu(entities, max_callsign_length) {
    const menu = document.getElementById("duty-menu");
    const body = document.getElementById("duty-menu-body");

    body.innerHTML = "";

    entities.forEach(entity => {
        const entity_div = document.createElement("div");
        entity_div.classList.add("entity");

        const entity_name = document.createElement("div");
        entity_name.classList.add("entity-name");
        entity_name.textContent = entity.entity;

        const duty_button = document.createElement("div");
        duty_button.classList.add("duty-button");
        duty_button.textContent = entity.on_duty ? "Actively On Duty" : "Go On Duty";
        duty_button.dataset.id = entity.id
        duty_button.dataset.callsign = entity.callsign

        if (entity.on_duty) {
            duty_button.classList.add("active");

            duty_button.addEventListener("mouseenter", () => {
                duty_button.textContent = "Go Off Duty";
                duty_button.classList.add("hover-off-duty");
            });
            duty_button.addEventListener("mouseleave", () => {
                duty_button.textContent = "Actively On Duty";
                duty_button.classList.remove("hover-off-duty");
            });

            duty_button.addEventListener("click", () => {
                fetch(`https://${GetParentResourceName()}/go_off_duty`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ entity: entity.id })
                });
                duty_button.disabled = true;
            });
        } else if (entity.suspended) {
            duty_button.classList.add("suspended");
            duty_button.textContent = "Suspended";
        } else if (entity.disabled) {
            duty_button.classList.add("disabled");
        } else {
            duty_button.addEventListener("click", () => {
                const entity_id = entity.id
                const callsign = entity.callsign
                const equips_loadout = entity.equips_loadout

                const data = { callsign: callsign, equips_loadout: equips_loadout, entity: entity.entity, entity_id: entity_id, require_callsign: entity.require_callsign, has_loadout: entity.loadout, has_bodycam: entity.bodycam, bodycam_status: entity.bodycam_status, username: entity.username, rank: entity.rank, avatar: entity.avatar }

                if (entity.require_callsign || entity.loadout) {
                    openActionModal("callsign", null, data, max_callsign_length);
                } else {
                    fetch(`https://${GetParentResourceName()}/go_on_duty`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ entity: entity.id })
                    });
                    close_menu('duty-menu')
                }
            });
        }

        entity_div.appendChild(entity_name);
        entity_div.appendChild(duty_button);
        body.appendChild(entity_div);
    });

    menu.style.display = "block";
}

function open_units_menu(entities) {
    const menu = document.getElementById("units-menu");
    const body = menu.querySelector(".units-body");

    body.innerHTML = "";

    const priority = {
        high_command: 0,
        supervisor: 1,
        member: 2
    };

    const unit_check = Object.values(entities).some(column =>
        column.some(entity => entity.members.length > 0)
    );
    
    if (!unit_check) {
        const text = document.createElement("div");
        text.classList.add("no-units-text");
        text.textContent = "There are no units currently on duty.";
        text.style.gridColumn = "2";
        body.appendChild(text);

        document.getElementById("units-on-duty-count").textContent = "0";
        document.getElementById("units-status-dot").classList.remove("active");
        document.getElementById("units-status-dot").classList.add("inactive");
        menu.style.display = "flex";
        return;
    }

    const total = Object.values(entities).reduce((sum, column) => sum + column.reduce((s, entity) => s + entity.members.length, 0), 0 );
    document.getElementById("units-on-duty-count").textContent = total;
    document.getElementById("units-status-dot").classList.remove("inactive");
    document.getElementById("units-status-dot").classList.add("active");

    function create_unit(unit) {
        const unit_item = document.createElement("div");
        unit_item.classList.add("unit-item");

        if (unit.callsign) {
            const callsign = document.createElement("div");
            callsign.classList.add("unit-callsign");
            callsign.textContent = unit.callsign;
            unit_item.appendChild(callsign);
        }

        const name = document.createElement("div");
        name.classList.add("info-name");
        name.textContent = unit.username;

        unit_item.appendChild(name);

        if (unit.is_command) {
            const icon = document.createElement("div");
            icon.classList.add("unit-icon", "high-command-icon");
            unit_item.appendChild(icon);
        } else if (unit.is_supervisor) {
            const icon = document.createElement("div");
            icon.classList.add("unit-icon", "supervisor-icon");
            unit_item.appendChild(icon);
        }

        unit_item.addEventListener("click", () => {
            fetch(`https://${GetParentResourceName()}/fetch_unit_info`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: unit.source, entity_id: unit.entity })
            })            
        });

        return unit_item;
    }

    Object.keys(entities).forEach(key => {
        const column = document.createElement("div");
        column.classList.add("entity-column");

        entities[key].forEach(entity => {
            const entity_list = document.createElement("div");
            entity_list.classList.add("entity-list");

            const entity_header = document.createElement("div");
            entity_header.classList.add("entity-header");

            const header_left = document.createElement("div");
            header_left.classList.add("entity-header-left");

            const img = document.createElement("img");
            img.classList.add("entity-image");
            img.src = `assets/${entity.id}.png`;

            const title = document.createElement("div");
            title.classList.add("entity-title");
            title.textContent = entity.title;

            header_left.appendChild(img);
            header_left.appendChild(title);

            const statistic = document.createElement("div");
            statistic.classList.add("entity-statistic");

            const dot = document.createElement("div");
            dot.classList.add("entity-status-dot", entity.members.length > 0 ? "active" : "inactive");

            const count = document.createElement("span");
            count.classList.add("entity-count");
            count.textContent = entity.members.length;

            const label = document.createElement("span");
            label.classList.add("entity-count-label");
            label.textContent = "on duty";

            statistic.appendChild(dot);
            statistic.appendChild(count);
            statistic.appendChild(label);

            entity_header.appendChild(header_left);
            entity_header.appendChild(statistic);

            const members_container = document.createElement("div");
            members_container.classList.add("entity-members");

            entity.members.sort((a, b) => priority[a.rank] - priority[b.rank])
            .forEach(member => {
                const unit_item = create_unit(member);
                members_container.appendChild(unit_item);
            });

            entity_list.appendChild(entity_header);
            entity_list.appendChild(members_container);
            column.appendChild(entity_list);
        });

        body.appendChild(column);
    });

    menu.style.display = "flex";
}

function open_unit_modal(unit) {
    const modal = document.getElementById("unit-information-modal");

    modal.dataset.unit_id = unit.id;
    modal.dataset.entity = unit.entity;
    const modal_overlay = document.getElementById("information-modal");
    modal_overlay.style.display = "flex";

    document.getElementById('unit-avatar').src = unit.avatar;
    document.getElementById("unit-name").textContent = unit.username;
    document.getElementById("unit-rank").textContent = unit.rank;
    document.getElementById("unit-department").textContent = unit.department;
    document.getElementById("unit-time").textContent = unit.start_time;
    document.getElementById("unit-hours").textContent = `${unit.weekly_hours} hours`;
    document.getElementById("unit-sessions").textContent = `${unit.weekly_sessions} sessions`;

    const suspend = document.getElementById('unit-suspend')
    const unsuspend = document.getElementById('unit-unsuspend')
    const sendoffduty = document.getElementById('send-off-duty')
    suspend.style.display = "none";
    unsuspend.style.display = "none";
    sendoffduty.style.display = "none";

    if (unit.suspended) {
        unsuspend.style.display = "block";
        unsuspend.dataset.id = unit.id

        document.getElementById('suspended-row').style.display = "flex";
        document.getElementById('suspended-by').textContent = unit.suspension_data.admin_username;
        if (unit.suspension_data.relative_timestamp) {
            document.getElementById('suspended-till').textContent = unit.suspension_data.relative_timestamp;
        } else {
            document.getElementById('suspended-till').textContent = unit.suspension_data.suspended_till;
        }
        document.getElementById('suspended-reason').textContent = unit.suspension_data.reason;
    } else {
        suspend.style.display = "block";
        sendoffduty.style.display = "block";
        unsuspend.dataset.id = null;
        document.getElementById('suspended-row').style.display = "none";
    }

    if (unit.is_viewer_supervisor) {
        document.getElementById('unit-information-actions').style.display = "flex"
    } else {
        document.getElementById('unit-information-actions').style.display = "none"
    }

    const categories = unit.daily_breakdown.map(d => d.date.split('-').reverse().slice(0, 2).join('/'));
    const labels = unit.daily_breakdown.map(d => getFullDate(d.date));
    const minutes = unit.daily_breakdown.map(d => Number(d.minutes));
    const afk_minutes = unit.daily_breakdown.map(d => Number(d.afk_minutes));

    create_bar_chart("duty-graph", categories, labels, minutes, afk_minutes);
    modal.style.display = "flex";
}

function open_manage_menu(data) {
    const modal = document.getElementById("department-information-modal");
    modal.dataset.entity_id = data.entity_id;

    const modal_overlay = document.getElementById("information-modal");
    modal_overlay.style.display = "flex";

    document.getElementById('department-image').src = `assets/${data.entity_id}.png`;
    document.getElementById("department-name").textContent = data.entity_name;
    document.getElementById("total-units").textContent = `${data.analytics.units} units`;
    document.getElementById("total-active-units").textContent = `${data.analytics.active_units} units`;
    document.getElementById("total-hours").textContent = `${data.analytics.total_hours} hours`;
    document.getElementById("total-sessions").textContent = `${data.analytics.total_sessions} sessions`;

    if (Array.isArray(data.suspended_users) && data.suspended_users.length > 0) {
        const container = document.getElementById("suspended-list");
        container.innerHTML = "";
        container.style.display = "flex"

        data.suspended_users.forEach(user => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("suspended-user");

            const profile = document.createElement("div");
            profile.classList.add("suspended-profile");

            const image = document.createElement("img");
            image.classList.add("suspended-image");
            image.src = user.avatar || 'assets/default.png';

            const details = document.createElement("div");
            details.classList.add("suspended-details");

            const name = document.createElement("span");
            name.classList.add("suspended-username");
            name.textContent = user.username;

            const time = document.createElement("span");
            time.classList.add("suspension-time");

            if (user.suspended_till) {
                time.innerHTML = `Suspended for ${user.relative}`;
            } else {
                time.textContent = "Suspended indefinitely";
            }

            details.appendChild(name);
            details.appendChild(time);
            profile.appendChild(image);
            profile.appendChild(details);

            const button = document.createElement("button");
            button.classList.add("unit-button", "view-profile");
            button.onclick = () => openActionMenu(user.id, data.entity_id);

            wrapper.appendChild(profile);
            wrapper.appendChild(button);
            container.appendChild(wrapper);
        });
    } else {
        document.getElementById('suspended-list').style.display = "none"
    }

    const categories = data.daily.map(d => d.date.split('-').reverse().slice(0, 2).join('/'));
    const labels = data.daily.map(d => getFullDate(d.date));
    const minutes = data.daily.map(d => Number(d.minutes));
    const afk_minutes = data.daily.map(d => Number(d.afk_minutes));

    create_bar_chart("dept-graph", categories, labels, minutes, afk_minutes);
    modal.style.display = "flex";
}

function close_modal(type) {
    document.getElementById(type).style.display = "none"

    if (type === "unit-information-modal") {
        if (document.getElementById('department-information-modal').style.display === "flex") {
            return document.getElementById('unit-information-modal').style.display = "none"
        }
        close_menu('information-modal', false)
    } else if (type === "department-information-modal") {
        close_menu('information-modal')
    }
 }

function close_menu(menu_id, disable_focus = true) {
    const menu = document.getElementById(menu_id);
    if (menu) menu.style.display = 'none';

    if (disable_focus) {
        fetch('https://' + GetParentResourceName() + '/disable_focus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'close' + menu_id })
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        if (document.getElementById('duty-menu').style.display === 'block') {
            if (document.getElementById('action-modal').style.display === "flex") {
                return
            }
            close_menu('duty-menu');
        }

        if (document.getElementById('units-menu').style.display === 'flex') {
            if (document.getElementById('action-modal').style.display === 'flex') {
                return close_menu('action-modal', false);
            }

            if (document.getElementById('unit-information-modal').style.display === 'flex') {
                close_menu('unit-information-modal', false);
                return document.getElementById("information-modal").style.display = "none";
            }

            close_menu('units-menu');
        }
    }
});

// Functions
function getOrdinal(n) {
    let s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getFullDate(dateStr) {
    let date = new Date(dateStr);
    let weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    let day = date.getDate();
    let month = date.toLocaleDateString('en-US', { month: 'long' });
    return `${weekday} ${getOrdinal(day)} ${month}`;
}

function create_bar_chart(id, categories, fullDates, minutes, minutes_afk) {
    document.getElementById(id).style.display = "none"

    const active_minutes = [];
    const afk_minutes = [];

    for (let i = 0; i < minutes.length; i++) {
        const active = Number(minutes[i]) || 0
        const afk = Number(minutes_afk[i]) || 0

        active_minutes.push(active)
        afk_minutes.push(afk > 0 ? afk : null)
    }

    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 200,
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        series: [
            {
                name: "Active Time",
                data: active_minutes
            },
            {
                name: "AFK Time",
                data: afk_minutes
            }
        ],
        xaxis: {
            categories: categories,
            labels: { style: { colors: "#DADADA" } }
        },
        yaxis: {
            min: 0,
            tickAmount: 5,
            forceNiceScale: true,
            labels: { style: { colors: "#DADADA" } }
        },
        fill: {
            opacity: 0.5,
            colors: ["#4CAF50", "#FFCC66"]
        },
        stroke: {
            show: true,
            width: 1,
            colors: ["#4CAF50", "#FFCC66"]
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            }
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        tooltip: { 
            theme: "dark",
            x: {
                formatter: function(val, opts) {
                    return fullDates[opts.dataPointIndex] || val;
                }
            },
            y: {
                formatter: function (val) {
                    return `${val} Minutes`;
                }
            }
         }
    };

    const chart = new ApexCharts(document.getElementById(id), options);
    chart.render();
    document.getElementById(id).style.display = "flex"
}

function openDropdown(type, event) {
    event.stopPropagation();
    const dropdown = document.getElementById(`${type}-action-dropdown`);
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';

    document.addEventListener('click', function handler(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
            document.removeEventListener('click', handler);
        }
    });
}

function resize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function prevent(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}

function openActionModal(menu, type, data) {
    const modal = document.getElementById('action-modal');
    const reason = document.getElementById('action-reason');
    const time = document.getElementById('action-time');
    const callsign = document.getElementById('action-callsign');
    const loadout = document.getElementById('action-loadout');
    const bodycam = document.getElementById('action-bodycam')

    const title = document.getElementById('action-modal-name');
    const subtitle = document.getElementById('action-modal-department');
    const avatar = document.getElementById('action-modal-avatar');
    const confirm_button = document.getElementById('action-modal-confirm');

    reason.style.display = "none";
    time.style.display = "none";
    callsign.style.display = "none";
    loadout.style.display = "none";
    bodycam.style.display = "none";

    if (menu === "unit") {
        const length_select = document.getElementById('suspension-length');

        const name = document.getElementById('unit-name').textContent;
        const rank = document.getElementById('unit-rank').textContent;
        const department = document.getElementById('unit-department').textContent;
        const original_avatar = document.getElementById('unit-avatar').src;
        avatar.src = original_avatar

        if (type === 'suspend') {
            title.textContent = `Suspend ${name}`;
            subtitle.textContent = `${rank}, ${department}`;
            confirm_button.textContent = 'Confirm Suspension';
            confirm_button.dataset.action = "suspend";
            time.style.display = 'flex';
            reason.style.display = 'flex';
        } else if (type === 'offduty') {
            title.textContent = `Send ${name} off duty`;
            subtitle.textContent = `${rank}, ${department}`;
            confirm_button.textContent = 'Send off Duty';
            confirm_button.dataset.action = "offduty";
            time.style.display = 'none';
            reason.style.display = 'flex';
        }

        document.getElementById('action-modal-reason').value = '';
        length_select.value = '1';
        if (typeof resize === 'function') resize(reason.querySelector('textarea'));

        modal.style.display = 'flex';
        document.getElementById('unit-action-dropdown').style.display = 'none';
    } else if (menu === "action") {
        const user = document.getElementById('unit-unsuspend').dataset.id;
        const entity = document.getElementById('unit-information-modal').dataset.entity;
        if (type === "unsuspend") {
            fetch(`https://${GetParentResourceName()}/unsuspend_unit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user, entity: entity })
            });
        }
    } else if (menu === "callsign") {
        modal.style.display = "flex";

        if (data.require_callsign) {
            callsign.style.display = "flex";
        }
        
        if (data.has_loadout) {
            loadout.style.display = "flex";
        }

        if (data.has_bodycam) {
            bodycam.style.display = "flex";
        }

        avatar.src = data.avatar;
        title.textContent = data.username
        subtitle.textContent = `${data.rank}, ${data.entity}`
        confirm_button.textContent = "Go on Duty"

        confirm_button.dataset.action = "onduty";
        confirm_button.dataset.entity = data.entity_id;

        document.getElementById('action-modal-callsign').value = data.callsign;
        document.getElementById('equip-loadout').value = data.equips_loadout;
        document.getElementById('enable-bodycam').value = data.bodycam_status
        document.getElementById('action-modal-callsign').maxLength = data.max_callsign_length || 8
        document.getElementById('callsign-field-label').textContent = `Callsign [Max ${data.max_callsign_length || 8} characters]`
    }
}

function openActionMenu(user, entity) {
    fetch(`https://${GetParentResourceName()}/fetch_user_info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user, entity: entity })
    })
}

function submitAction() {
    const action = document.getElementById('action-modal-confirm').dataset.action;
    const confirm_button = document.getElementById('action-modal-confirm')

    if (action === "onduty") {
        const entity_id = confirm_button.dataset.entity
        const callsign = document.getElementById('action-modal-callsign').value
        const loadout = document.getElementById('equip-loadout').value
        const bodycam = document.getElementById('enable-bodycam').value

        const callsign_element = document.getElementById('action-callsign');
        const loadout_element = document.getElementById('action-loadout');
        const bodycam_element = document.getElementById('action-bodycam');

        if (
            (callsign_element.style.display === "flex" && !callsign) ||
            (loadout_element.style.display === "flex" && loadout === "") ||
            (bodycam_element.style.display === "flex" && bodycam === "")
        ) {
            fetch(`https://${GetParentResourceName()}/send_notification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Missing Field",
                    description: "You have a missing field, make sure all fields are filled correctly",
                })
            });
            return;
        }

        fetch(`https://${GetParentResourceName()}/go_on_duty`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entity: entity_id, callsign: callsign, loadout: loadout, bodycam: bodycam })
        }).then(response => {
            document.getElementById('action-modal').style.display = "none";
            close_menu('duty-menu')
        })
    } else {
        const unit_id = document.getElementById('unit-information-modal').dataset.unit_id;
        const entity = document.getElementById('unit-information-modal').dataset.entity;

        const data = {}
        data.reason = document.getElementById('action-modal-reason').value

        if (action === "suspend") {
            data.length = document.getElementById('suspension-length').value
        }

        fetch(`https://${GetParentResourceName()}/execute_user_action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ unit_id: unit_id, action: action, data: data, entity: entity })
        }).then(response => {
            document.getElementById('action-modal').style.display = "none";
        })
    }
}