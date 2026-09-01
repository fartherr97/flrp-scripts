export const initPlayerPerms = () => {
    let firstSpawn = true;

    on('playerSpawned', () => {
        if(firstSpawn) {
            firstSpawn = false;
            emitNet('pDiscord:playerSpawned', "0");
        }
    });
}