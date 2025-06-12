import { base_url } from "../globals.js"

const headers = new Headers()
headers.append("Content-Type", "application/json");
headers.append("Access-Control-Allow-Origin", "*");

const Movie = {

    add: async (data) => {
        const { titulo, descricao, categorias, status, dataHora } = data;

        const returnData = {
            msg: "",
            status: "error"
        }

        try {
            returnData.data = await fetch(`${base_url}/movies`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })
        } catch (err) {
            console.error(err)
            returnData.msg = "Erro interno, por favor tente novamente mais tarde!"
            return returnData
        }

        returnData.msg = "Sucesso ao cadastrar filme!"
        returnData.status = "success"
        return returnData
    },

    edit: async (id, data) => {
        const { titulo, descricao, categorias, status, dataHora } = data;
        console.log("entra no edit");

        const returnData = {
            msg: "",
            status: "error"
        }

        try {
            returnData.data = await fetch(`${base_url}/movies/${id}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })
        } catch (err) {
            console.error(err)
            returnData.msg = "Erro interno, por favor tente novamente mais tarde!"
            return returnData
        }

        returnData.msg = "Sucesso ao editar filme!"
        returnData.status = "success"
        return returnData
    },

    delete: async () => {
        const returnData = {}

        try {
            returnData.data = await fetch(`${base_url}/movies/${id}`, {
                method: "DELETE",
                headers: headers
            })

            returnData.msg = "Sucesso ao excluir filme!"
            returnData.status = "success"
        } catch (err) {
            returnData.data = {}
            returnData.msg = "Erro interno ao excluir, tente novamente mais tarde!"
            returnData.status = "error"
        }

        return returnData
    },

    getAll: async () => {
        let retorno

        try {
            retorno = await fetch(`${base_url}/movies`, {
                method: "GET",
                headers: headers
            })
        } catch (err) {
            console.error(err);

            return {
                data: err,
            }
        }

        return {
            data: await retorno.json(),
        }
    },

    getById: async (id) => {
        const retorno = await fetch(`${base_url}/movies/${id}`, {
            method: "GET",
            headers: headers
        })

        return await retorno.json()
    }

}

export default Movie