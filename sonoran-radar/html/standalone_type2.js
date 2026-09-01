var patrol_speed;
var fast_lock_window;
var target_speed_window;
(function () {
  window.addEventListener("message", function (event) {
    patrol_speed = event.data.patrol_speed;
    fast_lock_window = event.data.fast_lock_window;
    target_speed_window = event.data.target_speed_window;
    switch (event.data.action) {
      case "dsr_FAST_LOCK":
        this.document.getElementById("fast-lock-speed-window").innerHTML = fast_lock_window;
        break;
      case "dsr_PATROL":
        this.document.getElementById("patrol-speed-window").innerHTML = patrol_speed;
        break;
      case "dsr_TARGET_SPEED":
        this.document.getElementById("target-speed-window").innerHTML = target_speed_window;
        break;
      case "dsr_TARGET_UP_ARROW":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_TARGET_DOWN_ARROW":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_FAST_DOWN_ARROW":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_FAST_UP_ARROW":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_XMT":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_Front":
        if (event.data.ants == 'rec') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else if (event.data.ants == 'on') {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_Rear":
        if (event.data.ants == 'rec') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else if (event.data.ants == 'on') {
          this.document.body.style.background = 'rgb(250, 12, 12)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_LOCK":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_FAST_ABOVE_RED":
        if (event.data.ants) {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_Fork":
        if (event.data.ants == 'opp') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else if (event.data.ants == 'starting') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      case "dsr_Same":
        if (event.data.ants == 'same') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else if (event.data.ants == 'starting') {
          this.document.body.style.background = 'rgb(19, 141, 0)';
        } else {
          this.document.body.style.background = 'rgb(0, 0, 0)';
        }
        break;
      default:
        break;
    }
  });
})();
