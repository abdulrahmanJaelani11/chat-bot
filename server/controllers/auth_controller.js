let express = require("express");
let response = require("../response");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hasher = require("../services/hashids");

const AnggotaModel = require("../models/anggota_model");
const AuthModel = require("../models/auth_model");

class AuthController {
    static async register(req, res) {
        let data = req.body;  
        try {
            if(data.nama_depan.length === 0 || data.nama_belakang.length === 0 || data.email.length === 0 || data.username.length === 0 || data.password.length === 0) {    
                response(400, data, "Mohon untuk melengkapi form terlebih dahulu!", res, null);
                return;
            }
            let cekAnggota = await AnggotaModel.getData(data.email);
            let dt_anggota = null;
            if(cekAnggota.length === 0) {
                dt_anggota = await AnggotaModel.insertAnggota(data);
                data.id_anggota = parseInt(dt_anggota.id);
            }else{
                response(400, data, "Email sudah terdaftar", res, null);
                return;
            }
            data = await AuthModel.register(data);
            response(200, data, "Berhasil Mendaftar", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendaftar", res, null);
        }
    }

    static async login(req, res) {
        let { username, password } = req.body;
        try {
            if(username.length === 0 || password.length === 0) {    
                response(400, null, "Mohon untuk melengkapi form terlebih dahulu!", res, null);
                return;
            }
            let data = await AuthModel.login(username);
            if(data) {
                if(AuthController.verifyPassword(password, data.password)) {
                    const token = jwt.sign({ 
                        id: data.id, 
                        username: data.username,
                        nama_lengkap: data.nama_lengkap,
                        email: data.email,
                        no_wa: data.no_wa,
                        instagram: data.instagram, 
                    }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    delete data.password;
                    data.id = hasher.encode(data.id);
                    data.token = token;
                    response(200, data, "Berhasil Login", res, null);
                } else {
                    response(400, data, "Password yang anda masukan salah", res, null);
                }
            } else {
                response(401, null, "Username yang anda masukan salah", res, null);
            }
        } catch (error) {
            response(500, null, "Gagal Login", res, null);
        }
    }

    static async verifyPassword(inputPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(inputPassword, hashedPassword);
            return match; // True jika cocok, false jika tidak
        } catch (error) {
            console.error('Error verifying password:', error);
            throw new Error('Verification failed');
        }
    }
}

module.exports = AuthController