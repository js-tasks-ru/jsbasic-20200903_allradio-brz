/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.render(rows);
  }

  render(rows) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    for (let i = 0; i < rows.length; i++) {
      const tr = document.createElement("tr");
      let rowStaff = rows[i];

      for (let key in rowStaff) {
        let td = document.createElement("td");
        td.innerHTML = rowStaff[key];
        tr.append(td);
      }

      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.innerText = "X";
      td.addEventListener("click", () => {
        tr.remove();
      });

      td.append(btn);
      tr.append(td);
      tbody.append(tr);
    }
    table.append(tbody);

    return table;
  }
}
