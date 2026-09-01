if Config.DoorDataStorageMethod ~= 'database' then return end

local function ensureTable(name, query)
    if not DB.tableExists(name) then
        DB.exec(query)
        Citizen.Trace(('^3[cd_doorlock]^0 Table ^5%s^0 was ^1missing^0 — created automatically.\n'):format(name))
        return true
    end
    return false
end

local function ensureColumn(tableName, columnName, alterQuery)
    if DB.columnExists(tableName, columnName) then
        return false
    end

    DB.exec(alterQuery)
    Citizen.Trace(('^3[cd_doorlock]^0 Column ^5%s.%s^0 was ^1missing^0 — created automatically.\n'):format(tableName, columnName))
    return true
end

function InsertSQL()
    local created, fixed = {}, {}

    if Config.AutoInsertSQL then
        -- cd_doorlock_locationgroups
        local tableQuery = [[
            CREATE TABLE `cd_doorlock_locationgroups` (
                `id` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_unicode_ci',
                `name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_bin',
                PRIMARY KEY (`id`) USING BTREE,
                UNIQUE INDEX `uq_name` (`name`) USING BTREE
            )
            COLLATE='utf8mb4_unicode_ci'
            ENGINE=InnoDB;
        ]]
        if ensureTable("cd_doorlock_locationgroups", tableQuery) then
            table.insert(created, "cd_doorlock_locationgroups")
        end

        -- cd_doorlock
        local tableQuery = [[
            CREATE TABLE `cd_doorlock` (
                `unique_id` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_unicode_ci',
                `door_name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
                `location_group` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_unicode_ci',
                `door_type` ENUM('single','double','garage','gates','double_gate') NOT NULL COLLATE 'utf8mb4_unicode_ci',
                `perms` LONGTEXT NOT NULL DEFAULT json_object(
                    'ace',        json_array(),
                    'job',        json_array(),
                    'discord',    json_array(),
                    'identifier', json_array(),
                    'items',      json_array()
                ) COLLATE 'utf8mb4_bin',
                `door_data` LONGTEXT NOT NULL COLLATE 'utf8mb4_bin',
                `distance` INT(10) UNSIGNED NOT NULL DEFAULT '2',
                `default_state` TINYINT(1) NOT NULL DEFAULT '0',
                `state` TINYINT(1) NOT NULL DEFAULT '0',
                `camera` TINYINT(1) NOT NULL DEFAULT '0',
                `secret` TINYINT(1) NOT NULL DEFAULT '0',
                `lockpickable` TINYINT(1) NOT NULL DEFAULT '0',
                `keep_open` TINYINT(1) NOT NULL DEFAULT '0',
                `auto_lock` INT(10) UNSIGNED NOT NULL DEFAULT '0',
                `door_sound` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
                `door_unlock_sound` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',

                PRIMARY KEY (`unique_id`) USING BTREE,
                INDEX `idx_location_group_door_name` (`location_group`, `door_name`) USING BTREE,
                CONSTRAINT `perms` CHECK (json_valid(`perms`)),
                CONSTRAINT `door_data` CHECK (json_valid(`door_data`))
            )
            COLLATE='utf8mb4_unicode_ci'
            ENGINE=InnoDB;
        ]]
        if ensureTable("cd_doorlock", tableQuery) then
            table.insert(created, "cd_doorlock")
        end
    end

    -- Ensure door_type ENUM contains 'gates' instead of 'gate'
    local enumFixQuery = [[
        ALTER TABLE `cd_doorlock`
        MODIFY COLUMN `door_type` ENUM('single','double','garage','gates','double_gate') 
        NOT NULL COLLATE 'utf8mb4_unicode_ci';
    ]]

    -- Only run if 'gates' is NOT already part of the ENUM
    local checkEnumQuery = [[
        SELECT COLUMN_TYPE FROM information_schema.columns
        WHERE table_schema = DATABASE()
        AND table_name = 'cd_doorlock'
        AND column_name = 'door_type';
    ]]

    local enumType = DB.scalar(checkEnumQuery)
    if enumType and not enumType:find("'gates'") then
        DB.exec(enumFixQuery)
        table.insert(fixed, "cd_doorlock.door_type (enum updated)")
    end

    -- Ensure auto_lock column exists
    local columnQuery = [[
        ALTER TABLE `cd_doorlock`
        ADD COLUMN `auto_lock` INT(10) UNSIGNED NOT NULL DEFAULT '0' AFTER `keep_open`;
    ]]
    if ensureColumn("cd_doorlock", "auto_lock", columnQuery) then
        table.insert(fixed, "cd_doorlock.auto_lock")
    end

    -- Change auto_lock default value from NULL to 0.
    local col = DB.fetch([[
        SELECT IS_NULLABLE, COLUMN_DEFAULT, COLUMN_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = 'cd_doorlock'
            AND COLUMN_NAME = 'auto_lock'
        LIMIT 1
    ]])

    if col and col[1] then
        local is_nullable = col[1].IS_NULLABLE
        local col_default = col[1].COLUMN_DEFAULT

        if col_default == nil or is_nullable == 'YES' then
            DB.exec("UPDATE `cd_doorlock` SET `auto_lock` = 0 WHERE `auto_lock` IS NULL;")

            DB.exec([[
                ALTER TABLE `cd_doorlock`
                MODIFY COLUMN `auto_lock` INT(10) UNSIGNED NOT NULL DEFAULT 0;
            ]])

            table.insert(fixed, "cd_doorlock.auto_lock (NULL default -> DEFAULT 0 + data fixed)")
        end
    end

    if #fixed > 0 then
        Citizen.Trace('^5--------------------------^0\n')
        Citizen.Trace('^5[cd_doorlock]^0 Auto-fixed SQL data:\n')
        for _, cd in ipairs(fixed) do
            Citizen.Trace('  - ^3'..cd..'^0\n')
        end
        Citizen.Trace('^5--------------------------^0\n')
    end

    if #created > 0 then
        Citizen.Trace('^5--------------------------^0\n')
        Citizen.Trace('^5[cd_doorlock]^0 Created/updated SQL structures:\n')
        for _, v in ipairs(created) do
            Citizen.Trace('  - ^3'..v..'^0\n')
        end
        Citizen.Trace('^5--------------------------^0\n')
    else
        Citizen.Trace('^2[cd_doorlock]^0 All SQL tables and columns already exist.\n')
    end
end