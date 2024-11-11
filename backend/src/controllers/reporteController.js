const Reporte = require("../models/reporte");
const validExists = require("../utils/dbValidationHelper");
const { sendSuccess, sendError } = require("../utils/responseHelper");
const reporteService = require("../services/reporteService");

exports.getAllReportes = async (req, res) => {
    try {
        const reportes = await reporteService.getAllReporte();
        return sendSuccess(res, reportes, "Reportes encontrados");
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

exports.getReporteById = async (req, res) => {
    try {
        const { id } = req.params;
        const reporte = await reporteService.getUserById(id);
        return sendSuccess(res, reporte, "Reporte encontrado");
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

exports.createReporte = async (req, res) => {
    try{
        const {fecha,total_productos,valor_total} = req.body;
        const newReporte = await reporteService.createReporte({fecha,total_productos,valor_total});
        if(newReporte){
            return sendSuccess(res,newReporte,"Reporte creado con éxito");
        }
    }catch(error){
        return sendError(res,500,"Error al crear el reporte");
    }
};

exports.updateReporte = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha,total_productos,valor_total} = req.body;
        const updatedReporte = await reporteService.updateReporte(id,{fecha,total_productos,valor_total});
        if(updatedReporte){// si el reporte se actualiza con éxito se envía un mensaje de éxito
            return sendSuccess(res,updatedReporte,"Reporte actualizado con éxito");
        }
    }catch(error){
        return sendError(res,500,error.message);
    }
}

exports.deleteReporte = async (req, res) => {
    try {
        const { id } = req.params;
        await reporteService.deleteReporte(id);
        return sendSuccess(res, null, "Reporte eliminado con éxito");
    } catch (error) {
        return sendError(res,500,error.message);
    }
}


