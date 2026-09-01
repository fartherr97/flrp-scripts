import { expect, test } from "@jest/globals";
import { buildPlayerPermissionObject, buildPlayerRolesAndCategories } from "../modules/builders/playerPerms.builders";

const test_config = {
    "group.staff": {
        owner: "814621350639566888",
        admin: "814621485058359298",
        moderator: "977196814941966337",
    },
    "group.first_responder": {
        leo: "977197040159293480",
        fire: "977196971225931786",
    },
};

const test_roles = [
    "814621350639566888",
    "977196814941966337",
    "977197040159293480",
];

const test_user = {
    roles: test_roles,
};

test("buildPlayerPermissionObject", () => {
    expect(buildPlayerPermissionObject(test_user.roles, test_config)).toEqual({
        "group.staff": true,
        "group.first_responder": true,
    });
});

test("buildPlayerRolesAndCategories", () => {
    expect(buildPlayerRolesAndCategories(test_user.roles, test_config)).toEqual([
        "group.staff",
        "owner",
        "moderator",
        "group.first_responder",
        "leo",
    ]);
});