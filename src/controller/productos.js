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

  async getById(id) {
    try {
      const objs = this.list;
      const IndexObj = objs.findIndex((o) => o.id == id);

      if (IndexObj == -1) {
        return null;
      }
      return objs[IndexObj];
    } catch (error) {
      console.log("error al buscar el producto");
    }
  }

  async getAll() {
    try {
      return this.list;
    } catch (error) {
      console.log(`Error al buscar la lista de productos ${error}`);
    }
  }

  async updateById(id, obj) {
    try {
      const objs = this.list;
      const IndexObj = objs.findIndex((o) => o.id == id);
      const newObj = (objs[IndexObj] = { id: id, ...obj });
      console.log(newObj);

      await this.write();
      return newObj;
    } catch (err) {
      return `Hubo un error al actualizar el elemento ${err}`;
    }
  }

  async deleteById(id) {
    try {
      const index = this.list.findIndex((element) => element.id == id);
      this.list.splice(index, 1);
      await this.write();
      return `Se borro el elemento con id:${id}`;
    } catch (err) {
      return `Hubo un error al borrar el elemento ${err}`;
    }
  }
}

//Inst & Export

const instProductosApi = new ProductosApi(txtPath);
instProductosApi.init();

module.exports = {
  ProductosController: instProductosApi,
};
