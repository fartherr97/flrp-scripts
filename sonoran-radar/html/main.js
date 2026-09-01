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
    default:
    break;
  }
  });
})();
