

import { base_url } from "../globals.js";

const User = {

    getById: async (id) => {

    },

    getByEmail: async (email) => {

    },

    register: async (data) => {

    },

    login: async (data) => {
        const {email, password} = data;

        const retorno = {
            status: "error"
        }

        if(!email) {
            retorno.msg = "Por favor, preencha o email!"
            return retorno
        }

        if(!password) {
            retorno.msg = "Por favor, preencha a senha!"
            return retorno
        }

        let user

        try {
            user = await User.getByEmail(email)
        } catch(err) {
            retorno.msg = "Erro interno, tente novamente mais tarde!"
            return retorno
        }


    }

}