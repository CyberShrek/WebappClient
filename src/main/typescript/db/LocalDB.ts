// @ts-ignore
import alasql from 'alasql';

export class LocalDB {

    public static createTable(
        tableName: string,
        columnNames: string[],
        rows: any[][]
    ): void {
        // Создаем таблицу с правильным синтаксисом
        const columnDefs = columnNames.map(name => `[${name}]`).join(', ');
        alasql(`CREATE TABLE ${tableName} (${columnDefs})`);

        // Вставляем данные построчно
        for (const row of rows) {
            // Формируем значения для вставки с правильным экранированием
            const values = row.map(value => {
                if (typeof value === 'string') {
                    return `'${value.replace(/'/g, "''")}'`;
                }
                return value !== null && value !== undefined ? value : 'NULL';
            }).join(', ');

            // Выполняем вставку для каждой строки
            alasql(`INSERT INTO ${tableName} VALUES (${values})`);
        }
    }

    public static dropTable(tableName: string): void {
        alasql(`DROP TABLE IF EXISTS ${tableName}`);
    }

    public static execute(query: string): Matrix {
        // Выполняем запрос
        const result: {}[] = alasql(query);

        // Обрабатываем разные форматы результатов
        if (result == null || result.length === 0) {
            return { head: [], data: [] };
        }

        // Получаем имена колонок
        const head = Object.keys(result[0]);

        // Преобразуем результат в массив массивов
        const data = result.map((row: any) =>
            head.map(columnName => row[columnName])
        );

        return { head, data };
    }
}