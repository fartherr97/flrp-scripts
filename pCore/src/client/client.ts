import { initPlayerPerms } from "./modules/playerPerms";
import { init } from "./modules/entityPerms";
import * as v from "../configs/vehiclePerms";
import * as w from "../configs/weaponPerms";

initPlayerPerms();
init(v, w);