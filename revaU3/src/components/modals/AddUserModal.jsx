import React, { useState } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Alert, Box, FormControlLabel, Checkbox
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
// Services
import { postUser } from "../../services/postUser";

const AddUserModal = ({ showAddModal, setShowAddModal, onInventoryAdded, fetchData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            job: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            job: Yup.string().required("El trabajo es obligatorio"),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            setLoading(true);
            try {
                const response = await postUser(values);
                if (response && ![200, 201].includes(response.status)) {
                    throw new Error(response.data?.message || "Error al crear usuario");
                }

                // Actualiza el mensaje de éxito
                setMensajeExitoAlert("Usuario creado correctamente");

                // Actualiza la tabla
                fetchData();

                // Reinicia el formulario
                formik.resetForm();

                // Limpia mensajes después de 3 segundos (opcional)
                setTimeout(() => {
                    setMensajeExitoAlert(null);
                }, 3000);

            } catch (e) {
                console.error("Error:", e);
                setMensajeErrorAlert(e.message || "Error al crear usuario");
            } finally {
                setLoading(false);
            }
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
    };

    return (
        <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        <strong>Agregar Nuevo Usuario</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField id="name" label="Nombre*" {...commonTextFieldProps}
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField id="job" label="Trabajo*" {...commonTextFieldProps}
                        value={formik.values.job}
                        error={formik.touched.job && Boolean(formik.errors.job)}
                        helperText={formik.touched.job && formik.errors.job}
                    />
                </DialogContent>
                <DialogActions>
                    <Box m="auto">
                        {mensajeErrorAlert && <Alert severity="error"><b>¡ERROR!</b> {mensajeErrorAlert}</Alert>}
                        {mensajeExitoAlert && <Alert severity="success"><b>¡ÉXITO!</b> {mensajeExitoAlert}</Alert>}
                    </Box>
                    <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={() => {formik.resetForm(); setShowAddModal(false)}}>CERRAR</LoadingButton>
                    <LoadingButton color="primary" startIcon={<SaveIcon />} variant="contained" type="submit" loading={Loading}>GUARDAR</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddUserModal;
