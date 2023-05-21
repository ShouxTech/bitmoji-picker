import { writeFile, readTextFile, removeFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';

export class TokenFile {
    static async initiateAppFolder() {
        if (await this.doesExist()) return;

        await createDir('bitmoji-picker/', { dir: BaseDirectory.AppData, recursive: true });
    }

    static async doesExist() {
        return await exists('bitmoji-picker/config', { dir: BaseDirectory.AppData });
    }

    static async create(token) {
        await writeFile('bitmoji-picker/config', token, { dir: BaseDirectory.AppData });
    }

    static async read() {
        return await readTextFile('bitmoji-picker/config', { dir: BaseDirectory.AppData });
    }

    static async remove() {
        await removeFile('bitmoji-picker/config', { dir: BaseDirectory.AppData });
    }
}