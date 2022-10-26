// Needs

const fs = require("fs/promises");
const path = require("path");

//Config

const txtPath = path.resolve(__dirname, "../../productos.txt");

//Class

class ProductosApi {
  constructor(ruta) {
    this.ruta = ruta;
    this.list = [];
  }

  async init() {
    try {
      const data = await fs.readFile(this.ruta, "utf-8");
      this.list = JSON.parse(data);
    } catch (error) {
      console.log(`Error al cargar los datos  ${error}`);
    }
  }

  async write() {
    try {
      const str = JSON.stringify(this.list);
      await fs.writeFile(this.ruta, str);
    } catch (error) {
      console.log(`Error al escribir archivo ${error}`);
    }
  }

  async save(obj) {
    const objs = this.list;

    try {
      if (objs.length <= 0) {
        const newId = 1;
        const newObj = { ...obj, id: newId };
        this.list = [newObj];
        await this.write();
        return newId;
      }
      const lastElement = objs[objs.length - 1];
      const newId = lastElement.id + 1;
      const newObj = { id: newId, ...obj };
      this.list = [...this.list, newObj];
      await this.write();
      return newId;
    } catch (error) {
      console.log(`Error al guardar el producto ${error}`);
    }
  }

  async getAll() {
    try {
      return this.list;
    } catch (error) {
      console.log(`Error al buscar la lista de productos ${error}`);
    }
  }
}

//Inst & Export

const instProductosApi = new ProductosApi(txtPath);
instProductosApi.init();

module.exports = {
  ProductosController: instProductosApi,
};
