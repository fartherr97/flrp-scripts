//   Greetings Code Viewer, hope you are well. If you are thinking of touching this file, do so with caution, or not at all, the latter is preferable.
//   If you don't know what you are doing (or, rather, you think you do), you may break certain functionalities of the code, players will complain, that's kinda bad and everyone is unhappy.
//   There's nothing to configure here, so if you're here to configure, you're in the wrong place, go back to the config.lua file and configure like crazy! - CW

var hide_hud_container = false
var prevent_disabling_priorities = false
var show_extra_priorities = false
var driving_mode = 'walking'

window.addEventListener('message', function (event) {
    const data = event.data;
    switch (data.action) {
        case 'open_management_menu':
            open_management_menu(data.data, data.restrict, data.permissions);
            break;
        case 'open_interface_settings':
            document.getElementById('interface-sidebar').style.display = 'flex';
            document.getElementById('accent-card').style.display = data.colour_customisation ? 'flex' : 'none';
            document.getElementById('priority_zones_visibility').style.display = data.prevent_disabling_priorities ? 'none' : 'flex';
            document.getElementById('server-name').textContent = data.server_name;

            const sidebar = document.getElementById("sidebar-body");
            sidebar.querySelectorAll('[id^="custom-element-"][id$="-toggle"]').forEach(node => {
                node.remove();
            });

            const custom_elements = data.custom_elements;
            if (custom_elements) {
                custom_elements.forEach(element => {
                    if (document.getElementById(`custom-element-${element.id}-toggle`)) return;

                    const card = document.createElement('div');
                    card.classList.add('sidebar-card');
                    card.id = `custom-element-${element.id}-toggle`;

                    const title = document.createElement('div');
                    title.classList.add('sidebar-title');
                    title.textContent = element.name;

                    const description = document.createElement('div');
                    description.classList.add('card-text');
                    description.textContent = element.description

                    const controls = document.createElement('div');
                    controls.classList.add('controls');

                    const show_control = document.createElement('div');
                    show_control.classList.add('control');
                    show_control.setAttribute('value', '2');
                    show_control.textContent = 'Show Element';

                    const hide_control = document.createElement('div');
                    hide_control.classList.add('control');
                    hide_control.setAttribute('value', '1');
                    hide_control.textContent = 'Hide Element';

                    if (element.state === 0) {
                        hide_control.classList.add('active');
                        show_control.classList.remove('active');
                    } else {
                        show_control.classList.add('active');
                        hide_control.classList.remove('active');
                    }

                    show_control.addEventListener('click', function () {
                        fetch(`https://${GetParentResourceName()}/update_custom_database`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: element.id, value: 1 })
                        });

                        show_control.classList.add('active');
                        hide_control.classList.remove('active');
                        document.getElementById(`custom-element-${element.id}`).style.display = 'block';
                    });

                    hide_control.addEventListener('click', function () {
                        fetch(`https://${GetParentResourceName()}/update_custom_database`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: element.id, value: 0 })
                        });

                        hide_control.classList.add('active');
                        show_control.classList.remove('active');
                        document.getElementById(`custom-element-${element.id}`).style.display = 'none';
                    });

                    controls.appendChild(show_control);
                    controls.appendChild(hide_control);

                    card.appendChild(title);
                    card.appendChild(description);
                    card.appendChild(controls);
                    sidebar.appendChild(card);
                });
            }
            break;
        case 'update_settings':
            apply_settings(data.settings);
            break;
        case 'open_modal':
            update_modal(data.data);
            break;
        case 'update_data':
            update_data(data.type, data.data);
            break;
        case 'update_job':
            update_job(data.job, data.callsign)
            break;
        case 'set_initial_data':
            document.getElementById('username').textContent = data.username;
            document.getElementById('server-id').textContent = data.id;
            document.getElementById('vanity-url').textContent = data.vanity_url;

            if (data.time) {
                document.getElementById('time').textContent = data.time;
            }

            update_vanity_url(data.vanity_url);
            break;
        case 'remove_extra_priorities':
            document.getElementById('extra-priority-zones').style.display = "none"
            show_extra_priorities = true
            break;
        case 'remove_health_armour':
            document.getElementById('hud-container').style.display = "none";
            hide_hud_container = true;
            break;
        case 'update_compass':
            update_compass(data.direction, data.street, data.area, data.postal);
            break
        case 'update_health':
            update_health(data.health, data.armour);
            break;
        case 'display_vote_leaderboard':
            display_vote_leaderboard(data.data, data.time);
            break;
        case 'open_vote_menu':
            open_vote_menu(data.data);
            break;
        case 'update_results':
            update_results(data.data);
            break;
        case 'toggle_vote_results':
            document.getElementById('voting-results').style.visibility = data.state ? 'visible' : 'hidden';
            break;
        case 'end_vote':
            document.getElementById('voting-results').style.display = 'none';
            if (document.getElementById('vote-interface').style.display === 'flex') {
                close_menu('vote-interface');
            }
            break;
        case 'cancel_vote':
            document.getElementById('voting-results').style.display = 'none';
            if (document.getElementById('vote-interface').style.display === 'flex') {
                close_menu('vote-interface');
            }
            break;
        case 'update_microphone_type':
            update_microphone_type(data.type, data.is_talking);
            break
        case 'update_microphone':
            update_microphone(data.is_talking, data.is_on_radio);
            break;
        case 'update_job_data':
            update_job_data(data.job, data.callsign, data.time);
            break;
        case 'update_headtags':
            update_headtags(data.headtags);
            break;
        case 'hide_all_hud':
            toggle_display("server-details", 1);
            toggle_display("compass-container", 1);
            toggle_display("details", 1);

            if (!hide_hud_container) {
                toggle_display("hud-container", 1);
            }

            if (document.getElementById('driving-container').style.display === 'flex') {
                document.getElementById('driving-container').style.display = 'none';
            }
            break;
        case 'update_speedometer':
            update_speedometer(data.speed);
            break;
        case 'update_vehicle_data':
            update_vehicle_data(data.fuel_level, data.vehicle_health);
            break;
        case 'change_driving_mode':
            driving_mode = data.mode;
            if (driving_mode === 'driving') {
                document.getElementById('driving-container').style.display = "flex";
                document.getElementById('compass-container').style.display = "none";
            } else if (driving_mode === 'walking') {
                document.getElementById('driving-container').style.display = "none";
                document.getElementById('compass-container').style.display = "flex";
            }
            break;
        case 'update_formats':
            update_checkboxes(data.areas)
            update_formats(data.raw_areas, data.types);
            update_peacetime_select(data.areas);
            update_priority_states(data.states);
            break;
        case 'show_driving_prompt':
            show_driving_prompt(data.text, data.key, data.flash)
            break;
        case 'hide_driving_prompt':
            hide_driving_prompt()
            break;
        case 'toggle_emergency_lights':
            if (data.toggle) {
                document.getElementById('driving-container').classList.add("police-overlay")
            } else {
                document.getElementById('driving-container').classList.remove("police-overlay")
            }
            break;
        case 'enter_edit_mode':
            enable_edit_mode()
            break;
        case 'create_notification':
            create_notification(data.title, data.description, data.time, data.style, data.location)
            break;
        case 'update_positions':
            update_positions(data.positions)
            break;
        case 'create_custom_element':
            create_custom_element(data.id, data.name, data.position, data.default_state, data.can_disable, data.default_inner_html, data.state);
            break;
        case 'update_custom_element':
            update_custom_element(data.id, data.inner_html);
            break;
        case 'remove_custom_element':
            remove_custom_element(data.id);
            break;
        case 'load_interface':
            document.querySelector('.dynamic-container').style.display = 'block';
            break;
        case 'area_notification':
            display_area_notification(data.area, data.area_name, data.data);
            break;
    }
});

function update_vanity_url(vanity_url) {
    const vanity_element = document.getElementById('vanity-url');
    vanity_element.innerHTML = '';

    const regex = /<(light|accent)>(.*?)<\/\1>/g;
    const matches = [...vanity_url.matchAll(regex)];

    matches.forEach(match => {
        const type = match[1];
        const text = match[2];

        const span = document.createElement('span');
        span.classList.add(type === 'light' ? 'light-text' : 'accent');
        span.textContent = text;
        vanity_element.appendChild(span);
    });
}

function update_positions(positions) {
    Object.entries(interface_elements).forEach(([id, defaults]) => {
        if (!(id in positions)) return;
        const position = positions[id] || {};
        const is_notification = defaults.include === false;
        const element = document.getElementById(id);
        if (!element) return;

        element.style.top = 'auto';
        element.style.bottom = 'auto';
        element.style.left = '';
        element.style.right = '';
        element.style.alignItems = '';
        element.style.position = '';

        if (defaults.top) element.style.top = defaults.top;
        if (defaults.bottom) element.style.bottom = defaults.bottom;
        if (defaults.left) element.style.left = defaults.left;
        if (defaults.right) element.style.right = defaults.right;
        if (defaults.alignItems) element.style.alignItems = defaults.alignItems;

        if (position.top) element.style.top = position.top;
        if (position.bottom) element.style.bottom = position.bottom;
        if (position.left) element.style.left = position.left;
        if (position.right) element.style.right = position.right;
        if (position.alignItems) element.style.alignItems = position.alignItems;

        element.style.position = is_notification ? 'fixed' : 'absolute';
    });
}

function create_notification(notification_title, notification_description, time, style = 'info', location = 'right') {
    const notification = document.createElement('div');
    notification.classList.add('notification');

    if (style === "announcement" && location != "center") {
        style = "info"
    }

    notification.classList.add(style);

    const icon = document.createElement('div');
    icon.classList.add('notification-icon', style);

    const content = document.createElement('div');
    content.classList.add('notification-content');

    const title = document.createElement('div');
    title.classList.add('notification-title');
    title.textContent = notification_title;

    const description = document.createElement('div');
    description.classList.add('notification-text');
    description.innerHTML = notification_description.replace(/\n/g, '<br>');

    content.appendChild(title);
    content.appendChild(description);
    notification.appendChild(icon);
    notification.appendChild(content);

    const container = document.querySelector(`.${location}-notifications`);
    if (container && location === "left") {
        container.appendChild(notification);
    } else {
        container.prepend(notification);
    }

    setTimeout(() => {
        notification.remove();
    }, time);
}

function create_custom_element(id, name, position, default_state, can_disable, default_inner_html, state) {
    if (document.getElementById(`custom-element-${id}`)) return;

    const details = document.getElementById('details');

    const element = document.createElement('div');
    element.id = `custom-element-${id}`;
    element.classList.add('detail-item', 'custom-element');
    element.innerHTML = default_inner_html;
    if (!default_state) {
        element.style.display = 'none';
    }
    if (position <= 0 || position > details.children.length) {
        details.appendChild(element);
    } else {
        details.insertBefore(element, details.children[position - 1]);
    }

    if (state == 0) {
        element.style.display = 'none';
    }
}

function update_custom_element(id, inner_html) {
    const element = document.getElementById(`custom-element-${id}`);
    if (element) {
        element.innerHTML = inner_html;
    }
}

function remove_custom_element(id) {
    const element = document.getElementById(`custom-element-${id}`);
    if (element) {
        element.remove();
    }
}

let edit_mode = false;
let dragged_element = null;
let offset = { x: 0, y: 0 };
let saved_positions = {};
let original_positions = {};

const interface_elements = {
    'hud-container': {
        top: '94.45%',
        left: '1.48%',
        bottom: '',
        right: '',
        include: true
    },
    'server-details': {
        top: '72.7%',
        left: '1.48%',
        bottom: '',
        right: '',
        include: true
    },
    'compass-container': {
        top: '94.45%',
        left: '18.4%',
        bottom: '',
        right: '',
        include: true
    },
    'driving-container': {
        top: '',
        left: 'calc(50% - 170px)',
        bottom: '2.13%',
        right: '',
        include: true
    },
    'details': {
        top: '',
        left: '18%',
        bottom: '6.28%',
        right: '',
        alignItems: 'flex-start',
        include: true
    },
    'right-notifications': {
        top: '1.5%',
        right: '0.75%',
        include: false
    },
    'center-notifications': {
        top: '1.5%',
        left: '50%',
        include: false
    },
    'left-notifications': {
        bottom: '27.7%',
        left: '1.58%',
        include: false
    }
};

let is_grid_enabled = true;
const grid_origin_x = 20;
const grid_origin_y = 20;

function show_grid() {
    let grid = document.getElementById('edit-grid');
    if (grid) return;

    grid = document.createElement('div');
    grid.id = 'edit-grid';
    grid.className = 'outer-grid';

    const inner = document.createElement('div');
    inner.className = 'inner-grid';
    grid.appendChild(inner);

    document.body.appendChild(grid);

    const vertical_line = document.createElement('div');
    vertical_line.id = 'vertical-line';
    vertical_line.className = 'vertical-line';
    vertical_line.style.left = (window.innerWidth / 2) + 'px';
    vertical_line.style.top = '20px';
    document.body.appendChild(vertical_line);

    const horizontal_line = document.createElement('div');
    horizontal_line.id = 'horizontal-line';
    horizontal_line.className = 'horizontal-line';
    horizontal_line.style.left = '20px';
    horizontal_line.style.top = (window.innerHeight / 2) + 'px';
    document.body.appendChild(horizontal_line);

    const right_line = document.createElement('div');
    right_line.id = 'right-line';
    right_line.className = 'vertical-line';
    right_line.style.left = (window.innerWidth - 20) + 'px';
    right_line.style.top = '20px';
    document.body.appendChild(right_line);

    const bottom_line = document.createElement('div');
    bottom_line.id = 'bottom-line';
    bottom_line.className = 'horizontal-line';
    bottom_line.style.left = '20px';
    bottom_line.style.top = (window.innerHeight - 20) + 'px';
    document.body.appendChild(bottom_line);
}

function hide_grid() {
    const grid = document.getElementById('edit-grid');
    if (grid) grid.remove();

    const vertical_line = document.getElementById('vertical-line');
    if (vertical_line) vertical_line.remove();

    const horizontal_line = document.getElementById('horizontal-line');
    if (horizontal_line) horizontal_line.remove();

    const right_line = document.getElementById('right-line');
    if (right_line) right_line.remove();

    const bottom_line = document.getElementById('bottom-line');
    if (bottom_line) bottom_line.remove();
}

function toggle_grid() {
    is_grid_enabled = !is_grid_enabled;

    if (is_grid_enabled) {
        show_grid();
    } else {
        hide_grid();
    }
}

function enable_edit_mode() {
    edit_mode = true;
    document.getElementById('editor-controls').style.display = "flex";
    document.getElementById('interface-sidebar').style.display = "none";

    const driving_mode = document.getElementById('driving-container');
    if (driving_mode && getComputedStyle(driving_mode).display === 'none') {
        driving_mode.dataset.wasHidden = 'true';
        driving_mode.style.display = 'flex';
    }

    const compass_container = document.getElementById('compass-container');
    if (compass_container && getComputedStyle(compass_container).display === 'none') {
        compass_container.dataset.wasHidden = 'true';
        compass_container.style.display = 'flex';
    }

    Object.keys(interface_elements).forEach(id => {
        const config = interface_elements[id];
        if (!config.include) return;
        const element = document.getElementById(id);
        if (!element) return;

        const scale = getScaleFactor();
        const rect = element.getBoundingClientRect();

        element.style.position = 'absolute';
        element.style.left = `${rect.left / scale}px`;
        element.style.top = `${rect.top / scale}px`;
        element.style.bottom = 'auto';
        element.style.right = '';
        element.style.cursor = 'move';
        element.style.zIndex = 9998;
        element.style.outline = '1px dashed var(--accent-color)';
        element.setAttribute('data-drag-id', id);

        element.addEventListener('mousedown', startDrag);
        element.addEventListener('dblclick', () => reset_position(element, id));

        if (id === 'details') {
            element.addEventListener('contextmenu', flip_details);
        }

    });

    show_notification_bounds();

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', onDrag);

    show_grid();
}

function getScaleFactor() {
    const container = document.querySelector('.dynamic-container');
    if (!container) {
        return 1;
    }

    const matrix = window.getComputedStyle(container).transform;
    if (!matrix || matrix === 'none') {
        return 1;
    }

    const match = matrix.match(/^matrix\(([\d.]+),/);
    const scale = match ? parseFloat(match[1]) : 1;
    return scale;
}

// notification moving logic
const areas = ['right-notifications', 'center-notifications', 'left-notifications'];
const types = ['info', 'success', 'error', 'warning'];

function show_notification_bounds() {
    areas.forEach(location => {
        const container = document.getElementById(location);
        if (!container) return;

        container.style.border = '1px dashed var(--accent-color)';
        container.zIndex = 2;

        container.setAttribute('data-drag-id', location);
        container.addEventListener('mousedown', start_vertical_drag);
        container.addEventListener('mousemove', onVerticalDrag);
        container.addEventListener('mouseup', stop_vertical_drag);
        container.addEventListener('dblclick', () => reset_position(container, location));
        container.style.cursor = 'ns-resize';

        for (let i = 0; i < 8; i++) {
            if (container.querySelector(`.notification.placeholder-${i}`)) continue;

            const type = types[i % types.length];

            const notification = document.createElement('div');
            notification.classList.add('notification', type, `placeholder-${i}`);

            const icon = document.createElement('div');
            icon.classList.add('notification-icon', type);

            const content = document.createElement('div');
            content.classList.add('notification-content');

            const title = document.createElement('div');
            title.classList.add('notification-title');
            title.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`;

            const description = document.createElement('div');
            description.classList.add('notification-text');
            description.textContent = 'This is a cute little test notification, whoop whoop!';

            content.appendChild(title);
            content.appendChild(description);
            notification.appendChild(icon);
            notification.appendChild(content);

            notification.style.pointerEvents = 'none';
            notification.style.userSelect = 'none';

            container.appendChild(notification);
        }
    });
}

let vertical_dragging = false;
let vertical_element = null;

function start_vertical_drag(e) {
  if (!edit_mode) return;
  const id = e.target.closest('[data-drag-id]')?.id;

  vertical_dragging = true;
  vertical_element = document.getElementById(id);

  const rect = vertical_element.getBoundingClientRect();
  offset.y = e.clientY - rect.top;
}

function onVerticalDrag(e) {
    if (!vertical_dragging || !vertical_element) return;

    let y = e.clientY - offset.y;
    const maxY = window.innerHeight - vertical_element.offsetHeight - 20;
    y = Math.max(20, Math.min(y, maxY));

    if (vertical_element.id === 'right-notifications' || vertical_element.id === "center-notifications") {
        vertical_element.style.top = y + 'px';
    } else if (vertical_element.id === 'left-notifications') {
        const bottom = window.innerHeight - vertical_element.offsetHeight - y;
        vertical_element.style.bottom = bottom + 'px';
    }
}

function stop_vertical_drag() {
    if (!vertical_dragging) return;

    const id = vertical_element.id;
    const position = {};

    const top = vertical_element.style.top;
    const bottom = vertical_element.style.bottom;

    if (top) position.top = top;
    if (bottom) position.bottom = bottom;

    if (Object.keys(position).length > 0) {
        saved_positions[id] = position;
    }

    vertical_dragging = false;
    vertical_element = null;
}

// 
function reset_position(element, id) {
    const original = interface_elements[id] || {};
    const is_notification = original.include === false;

    element.style.top = '';
    element.style.bottom = '';
    element.style.left = '';
    element.style.right = '';
    element.style.alignItems = '';
    element.style.position = '';

    if (original.top) element.style.top = original.top;
    if (original.bottom) element.style.bottom = original.bottom;
    if (original.left) element.style.left = original.left;
    if (original.right) element.style.right = original.right;
    if (original.alignItems) element.style.alignItems = original.alignItems;

    element.style.position = is_notification ? 'fixed' : 'absolute';

    saved_positions[id] = null
}

function flip_details() {
    const element = document.getElementById('details');
    const current = getComputedStyle(element).alignItems;

    if (current === 'flex-start') {
        element.style.alignItems = 'center';
        saved_positions['details'].alignItems = 'center';
    } else if (current === 'center') {
        element.style.alignItems = 'flex-end';
        saved_positions['details'].alignItems = 'flex-end';
    } else {
        element.style.alignItems = 'flex-start';
        saved_positions['details'].alignItems = 'flex-start';
    }
}

function startDrag(e) {
    if (!edit_mode) return;

    const id = e.target.closest('[data-drag-id]')?.getAttribute('data-drag-id');
    if (!id) return;

    const element = document.getElementById(id);
    if (!element) return;

    dragged_element = element;

    const scale = getScaleFactor();
    const rect = element.getBoundingClientRect();

    offset.x = (e.clientX - rect.left) / scale;
    offset.y = (e.clientY - rect.top) / scale;
}

function onDrag(e) {
    if (!edit_mode || !dragged_element) return;

    const scale = getScaleFactor();
    const rect = dragged_element.getBoundingClientRect();

    const width = rect.width / scale;
    const height = rect.height / scale;

    let left = e.clientX / scale - offset.x;
    let top = e.clientY / scale - offset.y;

    const padding = 20;
    const min_left = padding / scale;
    const min_top = padding / scale;
    const max_left = (window.innerWidth - padding) / scale - width;
    const max_top = (window.innerHeight - padding) / scale - height;

    left = Math.max(min_left, Math.min(left, max_left));
    top = Math.max(min_top, Math.min(top, max_top));

    let bottom = top + height;
    let snapped_bottom = bottom;

    if (is_grid_enabled) {
        const grid_size = 10;

        left = grid_origin_x + Math.round((left - grid_origin_x) / grid_size) * grid_size;
        bottom = grid_origin_y + Math.round((bottom - grid_origin_y) / grid_size) * grid_size;

        snapped_bottom = bottom;
        top = bottom - height;

        left += 1;
        top += 1;

        left = Math.max(min_left, Math.min(left, max_left));
        top = Math.max(min_top, Math.min(top, max_top));
    } else {
        snapped_bottom = top + height;
    }

    dragged_element.style.left = left + 'px';
    dragged_element.style.top = top + 'px';

    dragged_element.style.right = 'auto';
    dragged_element.style.bottom = 'auto';
}

function stopDrag() {
    if (dragged_element) {
        const id = dragged_element.id;

        const rect = dragged_element.getBoundingClientRect();
        const scale = getScaleFactor();

        const viewport_width  = window.innerWidth  / scale;
        const viewport_height = window.innerHeight / scale;

        const left = rect.left / scale;
        const top = rect.top / scale;
        const right = rect.right / scale;
        const bottom = rect.bottom / scale;
        const width = rect.width / scale;
        const height = rect.height / scale;

        const center_x = left + width / 2;
        const center_y = top + height / 2;

        const use_left = center_x < viewport_width / 2;
        const use_top = center_y < viewport_height / 2;

        const position = {};

        if (use_left) {
            const css_left = left;
            dragged_element.style.left = css_left + 'px';
            dragged_element.style.right = 'auto';
            position.left = css_left + 'px';
            position.right = 'auto';
        } else {
            const css_right = viewport_width - right;
            dragged_element.style.right = css_right + 'px';
            dragged_element.style.left = 'auto';
            position.right = css_right + 'px';
            position.left = 'auto';
        }

        if (use_top) {
            const css_top = top;
            dragged_element.style.top = css_top + 'px';
            dragged_element.style.bottom = 'auto';
            position.top = css_top + 'px';
            position.bottom = 'auto';
        } else {
            const css_bottom = viewport_height - bottom;
            dragged_element.style.bottom = css_bottom + 'px';
            dragged_element.style.top = 'auto';
            position.bottom = css_bottom + 'px';
            position.top = 'auto';
        }

        if (id === 'details') {
            position.alignItems = dragged_element.style.alignItems;
        }

        saved_positions[id] = position;
    }

    dragged_element = null;
}

function exit_edit_mode(type) {
    if (type === 'revert') {
        Object.keys(interface_elements).forEach(id => {
            const element = document.getElementById(id);
            if (!element) return;
            reset_position(element, id);
        });

        create_notification("Interface Reverted", "The whole interface has been reverted back to it's original positions.", 5000, "info", "center")
    } else {
        edit_mode = false;
        document.getElementById('editor-controls').style.display = "none";
        document.getElementById('interface-sidebar').style.display = "flex";

        const driving_mode = document.getElementById('driving-container');
        if (driving_mode && driving_mode.dataset.wasHidden === 'true') {
            driving_mode.style.display = 'none';
            delete driving_mode.dataset.wasHidden;
        }

        const compass_container = document.getElementById('compass-container');
        if (compass_container && compass_container.dataset.wasHidden === 'true') {
            compass_container.style.display = 'none';
            delete compass_container.dataset.wasHidden;
        }

        Object.keys(interface_elements).forEach(id => {
            const element = document.getElementById(id);
            if (!element) return;

            element.style.zIndex = 1;
            element.style.cursor = '';
            element.style.removeProperty('outline');

            element.removeEventListener('mousedown', startDrag);
            element.removeEventListener('dblclick', reset_position);

            if (id === 'details') {
                element.removeEventListener('contextmenu', flip_details);
            }
        });

        areas.forEach(location => {
            const container = document.getElementById(location);
            if (!container) return;

            container.style.border = '';
            container.style.cursor = '';

            if (location === 'right-notification' || location === 'left-notification') {
                container.removeAttribute('data-drag-id');
                container.removeEventListener('mousedown', start_vertical_drag);
                document.removeEventListener('mousemove', onVerticalDrag);
                document.removeEventListener('mouseup', stop_vertical_drag);
            }

            container.querySelectorAll('.notification').forEach(n => {
                if ([...n.classList].some(cls => cls.startsWith('placeholder-'))) {
                    n.remove();
                }
            });
        });

        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('mousemove', onDrag);

        if (type === "save") {
            const new_positions = {};
            const reset_position = [];

            Object.entries(saved_positions).forEach(([key, value]) => {
                if (value === null) {
                    reset_position.push(key);
                } else {
                    new_positions[key] = value;
                }
            });

            fetch(`https://${GetParentResourceName()}/update_positions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_positions: new_positions, reset_position: reset_position })
            });

            hide_grid();
            create_notification("Positions Updated", "The new interface positions have been saved!", 5000, "success", "center")
        } else {
            fetch(`https://${GetParentResourceName()}/exit_without_saving`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            hide_grid();
            create_notification("Exited without Saving", "You have exited the Editor Mode without saving", 5000, "info", "center")
        }
    }
}

function update_priority_states(states) {
    const select = document.getElementById("type-select");
    select.innerHTML = '';

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state.id;
        option.textContent = state.label;
        select.appendChild(option);
    });
}

function update_peacetime_select(areas) {
    const select = document.getElementById("peacetime-select");
    select.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = "Choose an option...";
    select.appendChild(placeholder);

    const default_areas = {
        "bc": "Blaine County",
        "ls": "Los Santos",
        "sw": "State Wide"
    };

    function create_option(value, label) {
        const option = document.createElement("option");
        option.value = value;
        option.setAttribute("data-key", value);
        option.textContent = label;
        select.appendChild(option);
    }

    Object.entries(default_areas).forEach(([key, name]) => {
        create_option(key, name);
    });

    if (areas.Custom && Object.keys(areas.Custom).length > 0) {
        Object.entries(areas.Custom).forEach(([key, name]) => {
            create_option(key, name);
        });
    }
}

function update_checkboxes(areas) {
    const container = document.getElementById("modal-checkboxes");
    container.innerHTML = "";

    const groups = {
        "Blaine County": ["ss", "pb", "gs"],
        "Los Santos": ["nls", "sls", "mp"],
        "Regions": ["bc", "ls", "sw"]
    };

    function create_group(name, keys, source) {
        const area_group = document.createElement("div");
        area_group.classList.add("checkbox-group");

        const strong = document.createElement("strong");
        strong.textContent = `${name}:`;
        area_group.appendChild(strong);

        keys.forEach(key => {
            if (source[key]) {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.value = key;

                const span = document.createElement("span");
                span.textContent = source[key];

                label.appendChild(input);
                label.appendChild(span);
                area_group.appendChild(label);
            }
        });

        container.appendChild(area_group);
    }

    Object.entries(groups).forEach(([name, keys]) => {
        create_group(name, keys, areas.Default);
    });

    if (Object.keys(areas.Custom).length > 0) {
        create_group("Custom Areas", Object.keys(areas.Custom), areas.Custom);
    }
}

function update_formats(areas, types) {
    Object.entries(areas).forEach(([key, name]) => {
        const labelElements = document.querySelectorAll(`[data-key="${key}"]`);
        labelElements.forEach((element) => {
            element.textContent = `${name}:`;
        });
    });

    Object.entries(types).forEach(([key, name]) => {
        const labelElements = document.querySelectorAll(`[data-key="${key}"]`);
        labelElements.forEach((element) => {
            element.textContent = `${name}:`;
        });
    });
}

function update_speedometer(speed) {
    const formattedSpeed = String(Math.round(speed)).padStart(3, '0');
    const digitElements = document.querySelectorAll('.digit');

    let has_zero = false;
    digitElements.forEach((digitElement, index) => {
        const digit = formattedSpeed[index];
        if (digit !== '0') {
            has_zero = true;
        }
        const isDigitActive = has_zero || index === 2;

        digitElement.textContent = digit;
        digitElement.classList.toggle('active', isDigitActive);
    });

    const mphElement = document.querySelector('.unit');
    const isMphActive = speed > 0;
    mphElement.classList.toggle('active', isMphActive);
}

function apply_settings(settings) {
    Object.keys(settings).forEach(key => {
        const value = settings[key];

        if (key === 'player_details_visibility') {
            toggle_display('player-details', value);
        } else if (key === 'server_details_visibility') {
            toggle_display('server-details', value);
        } else if (key === 'priority_zones_visibility') {
            toggle_display('priority-zones', value);
        } else if (key === 'accent_colour') {
            set_accent_colour(value);
            accent_colour = value;
        }

        if (!hide_hud_container) {
            toggle_display("hud-container", 2);
        }
        toggle_display("compass-container", 2);
        toggle_display("details", 2);

        const parent = document.getElementById(key);
        if (parent) {
            const active_value = value.toString();
            const selector = parent.querySelector(`.control[value="${active_value}"]`);
            if (selector) {
                parent.querySelectorAll('.control').forEach(sel => sel.classList.remove('active'));
                selector.classList.add('active');
            }
        }
    });

    if (driving_mode === 'driving') {
        document.getElementById('driving-container').style.display = "flex";
        document.getElementById('compass-container').style.display = "none";
    } else if (driving_mode === 'walking') {
        document.getElementById('driving-container').style.display = "none";
        document.getElementById('compass-container').style.display = "flex";
    }
}

// Event Listeners for the Settings Menu
document.querySelectorAll('.control').forEach(control => {
    control.addEventListener('click', function () {
        const parent = this.closest('.sidebar-card');
        const card_id = parent.id;
        const value = Number(this.getAttribute('value'));

        fetch(`https://${GetParentResourceName()}/update_database`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: card_id, value: value })
        });

        switch (card_id) {
            case 'player_details_visibility':
                toggle_display('player-details', value);
                break;
            case 'server_details_visibility':
                toggle_display('server-details', value);
                break;
            case 'priority_zones_visibility':
                toggle_display('priority-zones', value);
                break;
            case 'area_notifications':
                toggle_display('area-notification', value);
                break;

        }

        parent.querySelectorAll('.control').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });
});

let accent_colour = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();

document.querySelectorAll('.colour-control').forEach(selector => {
    selector.addEventListener('click', function () {
        const colour = this.style.backgroundColor;
        set_accent_colour(colour);
        accent_colour = colour;

        fetch(`https://${GetParentResourceName()}/update_accent_colour`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: colour })
        });
    });

    selector.addEventListener('mouseenter', function () {
        const colour = this.style.backgroundColor;

        document.documentElement.style.setProperty('--accent-color', colour);

        document.querySelectorAll('.fill-bar').forEach(element => {
            const match = colour.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const [r, g, b] = match.slice(1).map(v => Math.min(255, Math.floor(v * 1.2)));
                element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.60)`;
            }
        });
    });

    selector.addEventListener('mouseleave', function () {
        document.documentElement.style.setProperty('--accent-color', accent_colour);

        document.querySelectorAll('.fill-bar').forEach(element => {
            const match = accent_colour.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const [r, g, b] = match.slice(1).map(v => Math.min(255, Math.floor(v * 1.2)));
                element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.60)`;
            }
        });
    });
});

document.getElementById('interface-management').addEventListener('click', function(event) {
    const modal = document.getElementById('manager-modal');

    if (!modal.contains(event.target)) {
        document.getElementById('manager-modal').style.display = 'none';

        if (window.timeInterval) {
            clearInterval(window.timeInterval);
        }
    }
});

// Miscilaneous Functions to support the NUI Messages
function close_menu(menuId) {
    fetch('https://' + GetParentResourceName() + '/disable_focus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'close' + menuId })
    })
    .then(response => {
        document.getElementById(menuId).style.display = 'none';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function toggle_display(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = value === 2 ? '' : 'none';
    }
}

function set_accent_colour(colour) {
    if (colour.startsWith("rgba")) {
        colour = colour.replace("rgba", "rgb");
    }

    const match = colour.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

    if (match) {
        const [r, g, b] = match.slice(1);

        document.documentElement.style.setProperty('--accent-color', `rgb(${r}, ${g}, ${b})`);
        document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`);
    }

    document.querySelectorAll('.fill-bar').forEach(element => {
        const match = colour.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            const [r, g, b] = match.slice(1).map(v => Math.min(255, Math.floor(v * 1.2)));
            element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.60)`;
        }
    });

    document.querySelectorAll('.colour-control').forEach(el => {
        if (window.getComputedStyle(el).backgroundColor === colour) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
}

function update_compass(direction, street, area, postal) {
    const compass_container = document.getElementById("compass-container");
    const driving_container = document.getElementById("driving-container");

    [compass_container, driving_container].forEach(container => {
        if (!container) return;

        const compass = container.querySelector("#compass");
        const street_element = container.querySelector("#street");
        const area_element = container.querySelector("#area");

        if (!compass || !street_element || !area_element) return;

        compass.textContent = direction;
        street_element.textContent = `${street} [${postal}]`;
        area_element.textContent = area;
    });
}

function update_vehicle_data(fuel, health) {
    const fuel_element = document.getElementById('fuel-percentage');
    const health_element = document.getElementById('engine-percentage');

    fuel_element.textContent = `${fuel}%`;
    health_element.textContent = `${health}%`;

    if (parseFloat(fuel) < 10) {
        fuel_element.classList.add('flash-red');
    } else {
        fuel_element.classList.remove('flash-red');
    }

    if (parseFloat(health) < 31) {
        health_element.classList.add('flash-red');
    } else {
        health_element.classList.remove('flash-red');
    }
}

function update_job(job, callsign) {
    if (job) {
        document.getElementById('job-name').textContent = job;
        document.getElementById('job-details').style.display = 'block';
        if (callsign) {
            document.getElementById('callsign').textContent = callsign;
            document.getElementById('callsign').style.display = 'block';
            document.getElementById('job-seperator').style.display = 'block';
        } else {
            document.getElementById('callsign').style.display = 'none';
            document.getElementById('job-seperator').style.display = 'none';
        }
    } else {
        document.getElementById('job-details').style.display = 'none';
    }
}

function update_health(health, armor) {
    document.getElementById('health').style.transform = `scaleX(${health / 100})`;
    document.getElementById('armour').style.transform = `scaleX(${armor / 100})`;
}

function show_driving_prompt(text, key, flash) {
    const indicator = document.getElementById('indicator-key');
    const indicator_key = document.getElementById('key');
    const indicator_text = document.getElementById('indicator-text');

    indicator_key.textContent = key;
    indicator_text.textContent = text;
    indicator.style.display = "flex";

    if (flash) {
        indicator_key.classList.add('flash-key');
        indicator_text.classList.add('flash-text');
    } else {
        indicator_key.classList.remove('flash-key');
        indicator_text.classList.remove('flash-text');
    }
}

function hide_driving_prompt() {
    const indicator = document.getElementById('indicator-key');
    indicator.style.display = "none";
}

function display_area_notification(area, area_name, data) {
    const notification = document.getElementById('area-notification');
    notification.style.display = "flex";
    notification.classList.add('active');

    document.getElementById('area-name').textContent = area_name;

    const peacetime = document.getElementById('status-peacetime');
    const priority = document.getElementById('status-priority');

    peacetime.style.display = "none";
    priority.style.display = "none";

    if (data.peacetime) {
        document.getElementById('peacetime-time').textContent = `${data.peacetime.remaining_time} minutes left`;
        peacetime.style.display = "";
    }

    if (data.priority) {
        document.getElementById('priority-time').textContent = `${data.priority.remaining_time} minutes left`;
        priority.style.display = "";
    }

    document.getElementById('area-body').style.display = (data.peacetime || data.priority) ? "flex" : "none";

    setTimeout(() => {
        notification.classList.remove('active');
    }, 10000);
}

// The real shit
function open_management_menu(data, restrict, permissions) {
    document.getElementById('interface-management').style.display = 'flex';
    document.getElementById('action-button').disabled = false;
    document.getElementById('danger-button').disabled = false;

    const aop = document.getElementById('manage-aop');
    const peacetime = document.getElementById('manage-peacetime');
    const priority = document.getElementById('manage-priority');
    const vote_option = document.getElementById('create-vote')

    aop.style.filter = "";
    aop.style.pointerEvents = "";
    peacetime.style.filter = "";
    peacetime.style.pointerEvents = "";
    priority.style.filter = "";
    priority.style.pointerEvents = "";
    vote_option.style.display = "block";

    if (restrict) {
        if (!permissions.aop) {
            aop.style.filter = "blur(10px)";
            aop.style.pointerEvents = "none";
        }
        if (!permissions.peacetime) {
            peacetime.style.filter = "blur(10px)";
            peacetime.style.pointerEvents = "none";
        }
        if (!permissions.priority) {
            priority.style.filter = "blur(10px)";
            priority.style.pointerEvents = "none";
        }
        if (!permissions.createvote) {
            vote_option.style.display = "none";
        }
    }

    const aop_container = document.getElementById('manage-aop');
    aop_container.innerHTML = ''; 
    if (data.aop) {
        const aop = document.createElement('div');
        aop.classList.add('zone-item');

        if (data.aop.state === "vote") {
            aop.innerHTML = `
                <div class="zone-name">${data.aop.area_names}</div>
                <div class="zone-status">Vote in Progress</div>
            `;
        } else {
            aop.innerHTML = `
                <div class="zone-name">${data.aop.area_names}</div>
                <div class="zone-status">Active for ${data.aop.time} ${data.aop.time === 1 ? 'Minute' : 'Minutes'}</div>
            `;
        }

        aop.querySelector('.zone-status').addEventListener('click', () => {
            post('aop', data.aop.area);
        });
        aop_container.appendChild(aop);
    }

    const peacetime_container = document.getElementById('manage-peacetime');
    peacetime_container.innerHTML = ''; 
    if (Array.isArray(data.peacetime)) {
        data.peacetime.forEach(pt => {
            const peacetime = document.createElement('div');
            peacetime.classList.add('zone-item');

            if (pt.state === "disabled") {
                peacetime.innerHTML = `
                    <div class="zone-name">Disabled</div>
                    <div class="zone-status">Disabled for ${pt.time} ${pt.time === 1 ? 'Minute' : 'Minutes'}</div>
                `;
            } else {
                peacetime.innerHTML = `
                    <div class="zone-name">${pt.area_name}</div>
                    <div class="zone-status">${pt.time} ${pt.time === 1 ? 'Minute' : 'Minutes'} Left</div>
                `;
            }

            peacetime.querySelector('.zone-status').addEventListener('click', () => {
                post('peacetime', pt.area);
            });
            peacetime_container.appendChild(peacetime);
        });
    }

    const priorityContainer = document.getElementById('manage-priority');
    if (Array.isArray(data.priority)) {
        data.priority.forEach(pr => {
            if (pr.area === "fz" || pr.area === "banks" && show_extra_priorities) return;
            const priorityElementId = `manage-priority-${pr.area}`;
            let priority = document.getElementById(priorityElementId);

            if (!priority) {
                priority = document.createElement('div');
                priority.classList.add('zone-item');
                priority.id = priorityElementId;
                priorityContainer.appendChild(priority);
            }

            let status;

            if (pr.indefinite) {
                status = pr.state === "available" ? "Available" : pr.state_name;
            } else {
                if (pr.state === "available") {
                    status = `Available for ${pr.time} ${pr.time === 1 ? 'Minute' : 'Minutes'}`;
                } else {
                    status = `${pr.state_name}: ${pr.time} ${pr.time === 1 ? 'Minute' : 'Minutes'}`;
                }
            }            

            priority.innerHTML = `
                <div class="zone-name">${pr.area_name}</div>
                <div class="zone-status">${status}</div>
            `;

            priority.querySelector('.zone-status').addEventListener('click', () => {
                post('priority', pr.area);
            });
        });
    }
}

function update_data(type, data) {
    const management_menu = document.getElementById('interface-management');
    const management_menu_open = management_menu.style.display === 'flex';
    const modal_menu = document.getElementById('manager-modal');
    const modal_menu_open = modal_menu.style.display === 'flex';

    if (type === 'aop') {
        document.getElementById('aop').textContent = data.area_names;

        if (management_menu_open) {
            const aop_container = document.getElementById('manage-aop');
            aop_container.innerHTML = '';
            const aop = document.createElement('div');
            aop.classList.add('zone-item');

            if (data.time === 0) {
                aop.innerHTML = `
                    <div class="zone-name">${data.area_names}</div>
                    <div class="zone-status">Just updated</div>
                `;
            } else if (data.status === "vote") {
                aop.innerHTML = `
                    <div class="zone-name">${data.area_names}</div>
                    <div class="zone-status">Vote in Progress</div>
                `;
            } else {
                aop.innerHTML = `
                    <div class="zone-name">${data.area_names}</div>
                    <div class="zone-status">Active for ${data.time} ${data.time === 1 ? 'Minute' : 'Minutes'}</div>
                `;
            }

            aop.querySelector('.zone-status').addEventListener('click', () => {
                post('aop', data.areas);
            });

            aop_container.appendChild(aop);
        }
    } else if (type === 'peacetime') {
        if (data.expired || data.state === "disabled") {
            document.getElementById('peacetime').textContent = "Disabled";
        } else {
            document.getElementById('peacetime').textContent = `${data.area_name} [${data.time} ${data.time === 1 ? 'Min' : 'Mins'}]`;
        }

        if (management_menu_open) {
            const peacetime_container = document.getElementById('manage-peacetime');
            peacetime_container.innerHTML = '';

            const zone_item = document.createElement('div');
            zone_item.classList.add('zone-item');

            if (data.expired) {
                zone_item.innerHTML = `
                    <div class="zone-name">Disabled</div>
                    <div class="zone-status">Disabled Just now</div>
                `;
            } else if (data.state === "disabled") {
                zone_item.innerHTML = `
                    <div class="zone-name">Disabled</div>
                    <div class="zone-status">Disabled for ${data.time} ${data.time === 1 ? 'Minute' : 'Minutes'}</div>
                `;
            } else {
                zone_item.innerHTML = `
                    <div class="zone-name">${data.area_name}</div>
                    <div class="zone-status">${data.time} ${data.time === 1 ? 'Minute' : 'Minutes'} Left</div>
                `;
            }

            zone_item.querySelector('.zone-status').addEventListener('click', () => {
                post('peacetime', data.area);
            });

            peacetime_container.appendChild(zone_item);
        }

        if (modal_menu_open && document.getElementById('manager-modal').getAttribute('type') === `peacetime-${data.area}`) {
            if (data.expired) {
                document.getElementById('time-input').value = 0;
                document.getElementById('time-input').setAttribute('time', 0);
                document.getElementById('modal-time-input').style.display = 'none';
                document.getElementById('danger-button').style.display = 'none';
                document.getElementById('action-button').style.display = 'none';
                document.getElementById('peacetime-select').value = "";
                document.getElementById('peacetime-select').disabled = false
            } else {
                document.getElementById('time-input').value = data.time;
                document.getElementById('time-input').setAttribute('time', data.time);
            }
        }
    } else if (type === 'priority') {
        let format, admin_format;

        if (data.expired) {
            format = "Now Available";
            admin_format = "Recently Available";
        } else if (data.state === "available") {
            format = "Available"
            admin_format = `Available for ${data.time} ${data.time === 1 ? 'Minute' : 'Minutes'}`;
        } else {
            if (data.time === "" || data.indefinite) {
                format = `${data.state_name}`;
                admin_format = `${data.state_name}`;
            } else {
                format = `${data.state_name}: ${data.time} ${data.time === 1 ? 'Min' : 'Mins'}`;
                admin_format = `${data.state_name}: ${data.time} ${data.time === 1 ? 'Min' : 'Mins'}`;
            }
        }

        if (data.area === "bc") {
            document.getElementById('priority-bc').textContent = format;
        } else if (data.area === "ls") {
            document.getElementById('priority-ls').textContent = format;
        } else if (data.area === "fz") {
            document.getElementById('priority-fz').textContent = format;
        } else if (data.area === "banks") {
            document.getElementById('priority-banks').textContent = format;
        }

        if (management_menu_open) {
            let element = document.getElementById(`manage-priority-${data.area}`);
            if (element) {
                element.querySelector('.zone-status').textContent = admin_format;
            }
        }

        if (modal_menu_open && document.getElementById('manager-modal').getAttribute('type') === `priority-${data.area}`) {
            if (data.expired) {
                document.getElementById('modal-time-input').style.display = 'none';
                document.getElementById('action-button').style.display = 'none';
                document.getElementById('danger-button').style.display = 'none';
                document.getElementById('type-select').disabled = false;
                document.getElementById('type-select').value = "available";
            } else {
                document.getElementById('time-input').value = data.time;
                document.getElementById('time-input').setAttribute('time', data.time);
            }
        }
    } else if (type === "time") {
        document.getElementById('time').textContent = data.time;
    }
}

function create_detail_row(title, value) {
    const row = document.createElement('div');
    row.classList.add('details-row');

    const title_element = document.createElement('strong');
    title_element.textContent = title;

    const value_element = document.createElement('span');
    value_element.textContent = value;

    row.appendChild(title_element);
    row.appendChild(value_element);

    document.getElementById('details-box').appendChild(row);
}

function update_modal(data) {
    const { type, type_name, area, area_name, state, time, metadata } = data;

    const details_aop = document.getElementById('modal-details-aop');
    const select_aop = document.getElementById('modal-select-aop');
    const select_priority = document.getElementById('modal-select-priority');
    const select_peacetime = document.getElementById('modal-select-peacetime');
    const action_button = document.getElementById('action-button');
    const danger_button = document.getElementById('danger-button');
    const type_select = document.getElementById('type-select');
    const modal_time_input = document.getElementById('modal-time-input');
    const modal_title = document.getElementById('modal-title');
    const area_select = document.getElementById('area-select');
    const details_title = document.getElementById('aop-details-title')
    const time_input = document.getElementById('time-input');

    select_aop.style.display = 'none';
    select_priority.style.display = 'none';
    select_peacetime.style.display = 'none';
    details_aop.style.display = 'none';

    document.getElementById('manager-modal').style.display = 'block';
    modal_title.textContent = `Manage ${area_name}`;
    document.getElementById('modal-description').textContent = `Manage the ${type_name} using the controls below`;
    document.getElementById('manager-modal').setAttribute('type', `${type}-${area}`);
    document.getElementById('time-input').removeAttribute('time');
    document.getElementById('modal-select-aop-secondary').style.display = 'none';

    danger_button.style.display = 'block';
    action_button.style.display = 'block';
    action_button.innerText = '';
    danger_button.innerText = '';
    action_button.style.disabled = false;
    danger_button.style.disabled = false;
    action_button.disabled = false;
    danger_button.disabled = false;

    action_button.setAttribute('type', '');
    action_button.setAttribute('action', '');
    action_button.setAttribute('area', '');

    danger_button.setAttribute('type', '');
    danger_button.setAttribute('action', '');
    danger_button.setAttribute('area', '');

    action_button.setAttribute('type', type);
    action_button.setAttribute('area', area);
    danger_button.setAttribute('type', type);
    danger_button.setAttribute('area', area);

    if (type === 'aop') {
        modal_title.textContent = `Manage Area of Play`;
        select_aop.style.display = 'block';
        modal_time_input.style.display = 'none';
        action_button.style.display = 'none';
        danger_button.style.display = 'none';

        if (state === "active") {
            details_aop.style.display = 'block';
            details_title.textContent = "Details:";

            document.getElementById('details-box').innerHTML = '';
            create_detail_row('Area of Play:', area_name);
            create_detail_row('Set By:', metadata.set_by);
            create_detail_row('Active for', `${time} ${time === 1 ? 'Minute' : 'Minutes'}`);

            action_button.style.display = "block";
            action_button.innerText = "Change Area of Play";
            action_button.setAttribute('action', 'update');

            danger_button.style.display = 'block';
            danger_button.innerText = 'Cancel';
            danger_button.setAttribute('action', 'close');

            select_aop.style.display = 'none';
        } else if (state === "vote") {
            details_aop.style.display = 'block';
            details_title.textContent = "Active Vote Details:";

            document.getElementById('details-box').innerHTML = '';
            create_detail_row('Areas:', area_name);
            create_detail_row('Started By:', metadata.set_by);

            action_button.style.display = "block";
            action_button.innerText = "Cancel Vote";
            action_button.setAttribute('action', 'cancel');

            danger_button.style.display = 'block';
            danger_button.innerText = 'Cancel';
            danger_button.setAttribute('action', 'close');

            select_aop.style.display = 'none';
        }

        area_select.addEventListener('change', () => {
            const area = document.getElementById('area-select').value;
            const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
            checkboxes.forEach(checkbox => { checkbox.checked = false });
            checkboxes.forEach(checkbox => { checkbox.disabled = false });

            action_button.style.display = 'block';
            danger_button.style.display = 'block';
            danger_button.innerText = 'Cancel';
            danger_button.removeAttribute('type');
            danger_button.setAttribute('action', 'close');

            checkboxes.forEach(checkbox => {
                const clone = checkbox.cloneNode(true);
                checkbox.parentNode.replaceChild(clone, checkbox);
            });

            if (area === "vote") {
                action_button.innerText = "Create Server Vote";
                document.getElementById('aop-secondary-title').textContent = "Vote Options: (Choose Three Areas)";
                document.getElementById('modal-select-aop-secondary').style.display = 'block';
                action_button.setAttribute('action', 'vote');
                action_button.disabled = true;

                document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        const allCheckboxes = [...document.querySelectorAll('.checkbox-list input[type="checkbox"]')];
                        const selectedCount = allCheckboxes.filter(cb => cb.checked).length;

                        allCheckboxes.forEach(cb => {
                            cb.disabled = selectedCount >= 3 && !cb.checked;
                        });

                        action_button.disabled = selectedCount < 2;
                    });
                });
            }
             else if (area === "set") {
                action_button.innerText = "Update Area of Play"
                document.getElementById('aop-secondary-title').textContent = "Area Options:"
                document.getElementById('modal-select-aop-secondary').style.display = 'block';
                action_button.setAttribute('action', 'set')
                action_button.disabled = true;

                document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        const subGroups = {
                            bc: ['ss', 'pb', 'gs'],
                            ls: ['nls', 'sls', 'mp']
                        };

                        const allCheckboxes = [...document.querySelectorAll('.checkbox-list input[type="checkbox"]')];
                        const selected_count = allCheckboxes.filter(cb => cb.checked).length;

                        allCheckboxes.forEach(cb => {
                            cb.disabled = false;
                        });

                        action_button.disabled = selected_count < 1;

                        const selectedValues = allCheckboxes.filter(cb => cb.checked).map(cb => cb.value);

                        if (subGroups.bc.every(sub => selectedValues.includes(sub))) {
                            subGroups.bc.forEach(sub => {
                                document.querySelector(`input[value="${sub}"]`).checked = false;
                                document.querySelector(`input[value="${sub}"]`).disabled = true;
                            });
                            document.querySelector('input[value="bc"]').checked = true;
                            document.querySelector('input[value="bc"]').disabled = false;
                        }

                        if (subGroups.ls.every(sub => selectedValues.includes(sub))) {
                            subGroups.ls.forEach(sub => {
                                document.querySelector(`input[value="${sub}"]`).checked = false;
                                document.querySelector(`input[value="${sub}"]`).disabled = true;
                            });
                            document.querySelector('input[value="ls"]').checked = true;
                            document.querySelector('input[value="ls"]').disabled = false;
                        }

                        if (selectedValues.includes('bc') && selectedValues.includes('ls')) {
                            allCheckboxes.forEach(cb => {
                                cb.checked = false;
                                cb.disabled = true;
                            });
                            document.querySelector('input[value="sw"]').checked = true;
                            document.querySelector('input[value="sw"]').disabled = false;
                        }

                        if (selectedValues.includes('sw')) {
                            allCheckboxes.forEach(cb => {
                                if (cb.value !== 'sw') {
                                    cb.checked = false;
                                    cb.disabled = true;
                                }
                            });
                        }

                        if (selectedValues.includes('bc')) {
                            subGroups.bc.forEach(sub => {
                                document.querySelector(`input[value="${sub}"]`).disabled = true;
                            });
                        }
                        if (selectedValues.includes('ls')) {
                            subGroups.ls.forEach(sub => {
                                document.querySelector(`input[value="${sub}"]`).disabled = true;
                            });
                        }

                        const recheckedValues = allCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
                        if (recheckedValues.includes('bc') && recheckedValues.includes('ls')) {
                            allCheckboxes.forEach(cb => {
                                cb.checked = false;
                                cb.disabled = true;
                            });
                            document.querySelector('input[value="sw"]').checked = true;
                            document.querySelector('input[value="sw"]').disabled = false;
                        }
                    });
                });
            } else {
                action_button.innerText = "Update Area of Play"
                document.getElementById('modal-select-aop-secondary').style.display = 'none';
            }
        });

    } else if (type === 'priority') {
        document.getElementById('modal-select-priority').style.display = 'block';

        if (state === "available") {
            modal_time_input.style.display = 'none';

            action_button.style.display = 'none';
            action_button.setAttribute('action', 'manage');
            danger_button.innerText = 'Cancel';
            danger_button.setAttribute('action', 'close');

            type_select.value = "available";
            type_select.disabled = false;
        } else {
            modal_time_input.style.display = 'flex';

            action_button.innerText = 'Update Priority';
            action_button.setAttribute('action', 'manage');
            danger_button.innerText = 'Remove Priority';
            danger_button.setAttribute('action', 'remove');

            time_input.value = time;
            time_input.setAttribute('time', time);

            type_select.value = state;
            type_select.disabled = true;
        }

        type_select.addEventListener('change', () => {
            const state = type_select.value;
            if (state === "available") {
                modal_time_input.style.display = 'none';
                action_button.style.display = 'none';
            } else {
                modal_time_input.style.display = 'flex';
                time_input.value = '';

                action_button.style.display = 'block';
                action_button.innerText = 'Create Priority';
                danger_button.style.display = 'block';
                danger_button.innerText = 'Cancel';
                danger_button.setAttribute('action', 'close');
            }
        });
    } else if (type === 'peacetime') {
        modal_title.textContent = `Manage Peacetime`;
        document.getElementById('modal-select-peacetime').style.display = 'block';

        if (state === "disabled") {
            time_input.value = 0;
            modal_time_input.style.display = 'none';
            danger_button.style.display = 'none';
            action_button.style.display = 'none';
            action_button.setAttribute('action', 'manage');
            document.getElementById('peacetime-select').value = "";
            document.getElementById('peacetime-select').disabled = false
        } else {
            modal_time_input.style.display = 'flex';
            time_input.value = time;
            time_input.setAttribute('time', time);
            action_button.innerText = 'Update Peacetime';
            action_button.setAttribute('action', 'manage');
            danger_button.innerText = 'Remove Peacetime';
            danger_button.setAttribute('action', 'remove');
            document.getElementById('peacetime-select').value = area;
            document.getElementById('peacetime-select').disabled = true
        }

        document.getElementById('peacetime-select').addEventListener('change', () => {
            if (state === "disabled") {
                modal_time_input.style.display = 'flex';
                time_input.value = '';
                danger_button.style.display = 'block';
                action_button.style.display = 'block';
                action_button.innerText = 'Set Peacetime';
                danger_button.innerText = 'Cancel';
                danger_button.setAttribute('action', 'close');
            }
            // should probably be something here for if state isn't disabled (TODO)
        });

        if (state === "disabled") {
            danger_button.style.display = 'none';
            document.getElementById('modal-select-peacetime').style.display = 'block';
            action_button.innerText = 'Set Peacetime';
        }
    }
}

// Modal Buttons Logic
const action_button = document.getElementById('action-button');
const danger_button = document.getElementById('danger-button');

action_button.addEventListener('click', () => {
    const type = action_button.getAttribute('type');
    const action = action_button.getAttribute('action');

    if (type === "aop") {
        if (action === "vote") {
            const areas = [...document.querySelectorAll('.checkbox-list input[type="checkbox"]')].filter(cb => cb.checked).map(cb => cb.value);

            fetch(`https://${GetParentResourceName()}/create_vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ areas: areas })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
            })
        } else if (action === "set") {
            const areas = [...document.querySelectorAll('.checkbox-list input[type="checkbox"]')].filter(cb => cb.checked).map(cb => cb.value);

            fetch(`https://${GetParentResourceName()}/set_aop`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ areas: areas })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
            })
        } else if (action === "update") {
            document.getElementById('modal-details-aop').style.display = 'none';
            document.getElementById('modal-select-aop').style.display = 'block';
            document.getElementById('area-select').value = ""
            action_button.style.display = "none";
        } else if (action === "cancel") {
            fetch(`https://${GetParentResourceName()}/cancel_vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
            })
        }
    } else if (type === "peacetime") {
        if (action === "manage") {
            const time = document.getElementById('time-input').value;
            const raw_time = document.getElementById('time-input').getAttribute('time');
            const area = document.getElementById('peacetime-select').value;

            if (time === raw_time) return;

            fetch(`https://${GetParentResourceName()}/update_peacetime`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ area, time })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
            })
        }
    } else if (type === "priority") {
        if (action === "manage") {
            const state = document.getElementById('type-select').value;
            const time = document.getElementById('time-input').value;
            const area = action_button.getAttribute('area');
            const raw_time = document.getElementById('time-input').getAttribute('time');
            if (time === raw_time) return;

            fetch(`https://${GetParentResourceName()}/update_priority`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ area, state, time })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
            })
        }
    }
})

danger_button.addEventListener('click', () => {
    const type = danger_button.getAttribute('type');
    const action = danger_button.getAttribute('action');
    const area = danger_button.getAttribute('area');

    if (action === "close") return document.getElementById('manager-modal').style.display = 'none';

    if (type === "aop") {
        // something should probably go here but i cannot remember
    } else if (type === "peacetime") {
        if (action === "remove") {
            fetch(`https://${GetParentResourceName()}/remove_peacetime`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ area, action })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
                document.getElementById('peacetime-select').value = "";
                document.getElementById('time-input').value = "";
                document.getElementById('time-input').removeAttribute('time');
            })
        }
    } else if (type === "priority") {
        if (action === "remove") {
            fetch(`https://${GetParentResourceName()}/remove_priority`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ area, action })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('manager-modal').style.display = 'none';
                document.getElementById('time-input').removeAttribute('time');
            })
        }
    }
});

// Voting Logic
function open_vote_menu(data) {
    const areas = data.areas;
    document.getElementById('vote-interface').style.display = 'flex';

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`vote-options-${i}`).style.display = 'none';
    }

    areas.forEach(area => {
        const number = area.number;
        const option = document.getElementById(`vote-option-${number}`);
        const button = document.getElementById(`vote-button-${number}`);

        if (option && button) {
            document.getElementById(`vote-options-${number}`).style.display = 'flex';
            option.textContent = area.area_name;

            if (button.voteButtonClickHandler) {
                button.removeEventListener('click', button.voteButtonClickHandler);
            }

            button.voteButtonClickHandler = function() {
                fetch(`https://${GetParentResourceName()}/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ area: area.area })
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('vote-interface').style.display = 'none';
                });
            };

            button.addEventListener('click', button.voteButtonClickHandler);
        }
    });
}

function display_vote_leaderboard(data, time) {
    const areas = data.areas;
    const leaderboard_title = document.getElementById('results-title');
    document.getElementById('voting-results').style.display = 'flex';
    leaderboard_title.textContent = `Live Voting Results [${time}s]`;

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`vote-result-${i}`).style.display = 'none';
    }

    areas.forEach(area => {
        const number = area.number;

        document.getElementById(`vote-result-${number}`).style.display = 'flex';
        document.getElementById(`results-name-${number}`).textContent = area.area_name;
        document.getElementById(`results-stats-${number}`).textContent = `${area.percentage || 0}% [${Object.keys(area.votes).length}]`;
    });

    let seconds_remaining = time;
    const interval = setInterval(() => {
        seconds_remaining--;

        leaderboard_title.textContent = `Live Voting Results [${seconds_remaining}s]`;

        if (seconds_remaining <= 0) {
            clearInterval(interval);
            leaderboard_title.textContent = "Live Voting Results [0s]";
        }
    }, 1000);
}

function update_results(data) {
    const areas = data.areas;

    areas.forEach(area => {
        const number = area.number;

        const total_votes = Object.keys(area.votes).length;
        const vote_count = areas.reduce((sum, area) => sum + Object.keys(area.votes).length, 0);
        const percentage = vote_count > 0 ? Math.round((total_votes / vote_count) * 100) : 0;

        document.getElementById(`results-name-${number}`).textContent = area.area_name;
        document.getElementById(`results-stats-${number}`).textContent = `${percentage}% [${total_votes}]`;
    });
}

function add_hover_effect(container) {
    const modal = document.getElementById('manager-modal');

    container.addEventListener('mouseenter', () => {
        container.style.opacity = '1';
    });

    container.addEventListener('mouseleave', () => {
        if (modal.style.display === 'none' || modal.style.display === '') {
            container.style.opacity = '0.2';
        }
    });
}

// Microphone Logic
function update_microphone_type(type, is_talking) {
    type = parseInt(type)

    const microphone_element = document.getElementById("microphone");

    if (type == 1) {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>`;
    } else if (type == 2) {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"/></svg>`;
    } else if (type == 3) {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>`;
    } else if (type == 4) {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z"/></svg>`;
    } else if (type == 5) {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M112 24c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144L0 300.1c0 12.7 5.1 24.9 14.1 33.9l3.9 3.9c9 9 14.1 21.2 14.1 33.9L32 464c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-92.1c0-12.7 5.1-24.9 14.1-33.9l3.9-3.9c9-9 14.1-21.2 14.1-33.9L384 144c0-26.5-21.5-48-48-48l-16 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l-32 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l-48 0 0-72zm0 136l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>`;
    } else {
        microphone_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"/></svg>`;
    }

    update_microphone(is_talking)
}

function update_microphone(is_talking) {
    const microphone = document.getElementById("microphone");

    if (is_talking) {
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        const match = accentColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            const [r, g, b] = match.slice(1).map(v => Math.min(255, Math.floor(v * 1.2)));
            microphone.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.60)`;
        }
    } else {
        microphone.style.backgroundColor = "rgba(18, 20, 25, 0.75)";
    }
}

function update_job_data(job, callsign, time) {
    const job_details = document.getElementById('job-details');
    const job_name = document.getElementById('job-name');
    const job_label = document.getElementById('job-label');
    const callsign_element = document.getElementById('callsign');
    const callsign_label = document.getElementById('callsign-label');
    const job_separator = document.getElementById('job-seperator');
    const time_element = document.getElementById('detail-time');
    const time_label = document.getElementById('time-label');
    const time_separator = document.getElementById('time-seperator');

    job_details.style.display = "none";
    job_name.textContent = "";
    job_label.style.display = "none";
    callsign_element.textContent = "";
    callsign_label.style.display = "none";
    job_separator.style.display = "none";
    time_element.textContent = "";
    time_label.style.display = "none";
    time_separator.style.display = "none";

    if (job) {
        job_name.textContent = job;
        job_label.style.display = "block";
        job_details.style.display = "flex";
    }

    if (callsign) {
        callsign_element.textContent = callsign;
        callsign_label.style.display = "block";
        job_separator.style.display = "block";
        job_details.style.display = "flex";
    }

    if (time) {
        time_element.textContent = time;
        time_label.style.display = "block";
        time_separator.style.display = "block";
        job_details.style.display = "flex";
    }
}

function update_headtags(tags) {
    const headtags_element = document.getElementById('headtags');
    const headtag_label = document.getElementById('headtag-label');
    const name_separator = document.getElementById('name-seperator');

    if (tags) {
        headtags_element.textContent = tags;
        headtags_element.style.display = "block";
        headtag_label.style.display = "block";
        name_separator.style.display = "block";
    } else {
        headtags_element.textContent = "";
        headtags_element.style.display = "none";
        headtag_label.style.display = "none";
        name_separator.style.display = "none";
    }
}

// Hover Effects
add_hover_effect(document.getElementById('interface-sidebar'));
add_hover_effect(document.getElementById('interface-management'));

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        if (document.getElementById('interface-management').style.display === 'flex') { 
            if (document.getElementById('manager-modal').style.display === 'flex') {
                document.getElementById('manager-modal').style.display = 'none';
            } else {
                close_menu("interface-management");
            }
        };
        if (document.getElementById('interface-sidebar').style.display === 'flex') {
            close_menu("interface-sidebar") 
        };
        if (document.getElementById('vote-interface').style.display === 'flex') { close_menu("vote-interface") }
    }
});

function post(type, area) {
    fetch(`https://${GetParentResourceName()}/open_modal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, area })
    })
}