window.addEventListener('message', (event) => {
    const data = event.data;

    switch (data.action) {
        case 'show_selector':
            generate_spawn_options(data.spawnpoints, data.restrict_options, data.restrict_last_location, data.remove_last_location);
            document.getElementById('spawn-page').style.display = 'flex';

            if (data.area_of_play) {
                document.getElementById('area-indicator').style.display = 'block';
                document.getElementById('area-of-play').textContent = data.area_of_play;
            }
            break;
        case 'hide_selector':
            document.getElementById('spawn-page').style.display = 'none';
            document.getElementById('area-indicator').style.display = 'none';
            break;
        case 'set_spawn_active':
            document.querySelectorAll('.spawn-option').forEach(option => { option.classList.remove('active'); });
            document.querySelectorAll('.spawn-option .location-name').forEach(element => {
                if (element.textContent.trim() === data.spawn) { element.closest('.spawn-option').classList.add('active'); }
            });
            break;
    }
})

let is_dragging = false;
let has_moved = false;
let startX, startY;
const drag_threshold = 5;

document.addEventListener('mousedown', start_dragging);
document.addEventListener('mouseup', stop_dragging);
document.addEventListener('mousemove', move_camera);
document.addEventListener('wheel', zoom_camera);

function is_over_selector(x) {
    const selector = document.getElementById('spawn-selector');
    const rect = selector.getBoundingClientRect();
    return x <= rect.right;
}

function start_dragging(event) {
    if (is_over_selector(event.clientX)) return;

    startX = event.clientX;
    startY = event.clientY;
    is_dragging = true;
    has_moved = false;

    document.body.style.cursor = 'grabbing';
}

function move_camera(event) {
    if (!is_dragging || is_over_selector(event.clientX)) return;

    const deltaX = Math.abs(event.clientX - startX);
    const deltaY = Math.abs(event.clientY - startY);

    if (deltaX > drag_threshold || deltaY > drag_threshold) {
        has_moved = true;

        const moveDeltaX = startX - event.clientX;
        const moveDeltaY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        $.post(`https://${GetParentResourceName()}/move_camera`, JSON.stringify({ deltaX: moveDeltaX, deltaY: moveDeltaY }));
    }
}

function stop_dragging(event) {
    if (!is_dragging || is_over_selector(event.clientX)) {
        is_dragging = false;
        document.body.style.cursor = 'default';
        return;
    }

    if (!has_moved) {
        const screenX = event.clientX / window.innerWidth;
        const screenY = event.clientY / window.innerHeight;

        $.post(`https://${GetParentResourceName()}/checkMarkerClick`, JSON.stringify({ screenX: screenX, screenY: screenY }));
    }

    is_dragging = false;
    document.body.style.cursor = 'default';
}

function zoom_camera(event) {
    if (is_over_selector(event.clientX)) return;

    let zoom_amount = event.deltaY > 0 ? -5 : 5;

    $.post(`https://${GetParentResourceName()}/zoom_camera`, JSON.stringify({ zoom_amount: zoom_amount }));
}

function generate_spawn_options(spawnpoints, disable_options, restrict_last_location, remove_last_location) {
    const spawn_locations = document.getElementById('spawn-locations');
    spawn_locations.innerHTML = '';

    spawnpoints.forEach(point => {
        const option = document.createElement('div');
        option.className = 'spawn-option';

        const content = document.createElement('div');
        content.className = 'spawn-content';
        content.style.backgroundImage = `url('assets/spawn_images/${point.image}')`;

        const name = document.createElement('span');
        name.className = 'location-name';
        name.textContent = point.name;

        const button = document.createElement('button');
        button.className = 'spawn-here-button';
        button.textContent = 'Spawn at this Location';

        if (!restrict_last_location && disable_options) {
            option.classList.add('disabled');
            button.disabled = true;
        } else {
            button.onclick = function() {
                spawn(point.name);
            };
        }

        content.appendChild(name);
        content.appendChild(button);
        option.appendChild(content);
        spawn_locations.appendChild(option);
    });

    document.querySelectorAll('.spawn-option').forEach(option => {
        option.addEventListener('click', function() {
            const name = this.querySelector('.location-name').textContent;

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                $.post(`https://${GetParentResourceName()}/select_location`, JSON.stringify({ location: null }));
            } else {
                document.querySelectorAll('.spawn-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                $.post(`https://${GetParentResourceName()}/select_location`, JSON.stringify({ location: name }));
            }
        });
    });

    if (remove_last_location || restrict_last_location) {
        document.getElementById('spawn-at-last-location').style.display = 'none';
    } else {
        document.getElementById('spawn-at-last-location').disabled = false;
        document.getElementById('spawn-at-last-location').addEventListener('click', function() { $.post(`https://${GetParentResourceName()}/spawn_last_location`) });
    }
}

document.getElementById("spawn-at-last-location").addEventListener("mouseenter", () => {
    $.post(`https://${GetParentResourceName()}/last_location_hover`, JSON.stringify({ hovering: true }));
});

document.getElementById("spawn-at-last-location").addEventListener("mouseleave", () => {
    $.post(`https://${GetParentResourceName()}/last_location_hover`, JSON.stringify({ hovering: false }));
});

function spawn(name) { $.post(`https://${GetParentResourceName()}/spawn`, JSON.stringify({ name })) };